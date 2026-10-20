/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// AI Studio runtime requires dev server to run strictly on port 3000.
// Do not use process.env.PORT (which is set to 8080 for the Nginx proxy).
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS and OPTIONS handling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

import { formatTelegramNotification, formatIndianStandardTime } from './src/utils/telegramFormat.ts';
import { dispatchTelegramInquiry } from './src/utils/telegramService.ts';

// Helper to escape HTML characters for Telegram HTML parse mode (re-exported or handled in utility)

// In-memory cache for detected chat ID if not explicitly specified in env
let cachedChatId: string | number | null = null;

// Temporary, secure server-side diagnostic endpoint to detect group chat ID via getUpdates
app.get(['/api/telegram-status', '/api/telegram-status/'], async (req, res) => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const envChatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !botToken.trim()) {
    return res.status(200).json({
      botTokenConfigured: false,
      chatIdConfigured: Boolean(envChatId),
      detectedChatId: null,
      message: 'TELEGRAM_BOT_TOKEN environment variable is not configured.'
    });
  }

  try {
    // Call Telegram getUpdates API (strictly server-side, never logging or returning token)
    const response = await fetch(`https://api.telegram.org/bot${botToken.trim()}/getUpdates`, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });

    const data: any = await response.json().catch(() => ({}));

    // If webhook is active or Telegram returns an error
    if (!response.ok || !data.ok) {
      const description = data.description || 'Unknown Telegram API error';
      const isWebhookActive = description.toLowerCase().includes('webhook') || response.status === 409;

      if (isWebhookActive) {
        return res.status(200).json({
          botTokenConfigured: true,
          chatIdConfigured: Boolean(envChatId),
          detectedChatId: cachedChatId || (envChatId ? Number(envChatId) : null),
          webhookActive: true,
          message:
            'A webhook is currently active on this bot, which prevents getUpdates from working. No changes were made to the webhook.'
        });
      }

      return res.status(200).json({
        botTokenConfigured: true,
        chatIdConfigured: Boolean(envChatId),
        detectedChatId: null,
        message: `Telegram API error: ${description}`
      });
    }

    const updates = Array.isArray(data.result) ? data.result : [];

    if (updates.length === 0) {
      return res.status(200).json({
        botTokenConfigured: true,
        chatIdConfigured: Boolean(envChatId),
        detectedChatId: cachedChatId || (envChatId ? Number(envChatId) : null),
        message:
          'Bot token is valid, but no recent updates found in getUpdates. Please send a test message in your UAJ group and refresh this endpoint.'
      });
    }

    // Inspect recent updates from newest to oldest for group / supergroup chat
    let detectedChat: { id: number | string; title?: string; type?: string } | null = null;

    for (let i = updates.length - 1; i >= 0; i--) {
      const update = updates[i];
      const chat =
        update.message?.chat ||
        update.my_chat_member?.chat ||
        update.channel_post?.chat ||
        update.edited_message?.chat;

      if (chat && (chat.type === 'group' || chat.type === 'supergroup')) {
        detectedChat = { id: chat.id, title: chat.title, type: chat.type };
        break;
      }
    }

    // Fallback to any recent chat if not strictly marked as group
    if (!detectedChat) {
      for (let i = updates.length - 1; i >= 0; i--) {
        const update = updates[i];
        const chat =
          update.message?.chat ||
          update.my_chat_member?.chat ||
          update.channel_post?.chat;
        if (chat && chat.id) {
          detectedChat = { id: chat.id, title: chat.title || chat.username, type: chat.type };
          break;
        }
      }
    }

    if (detectedChat) {
      cachedChatId = detectedChat.id;
      return res.status(200).json({
        botTokenConfigured: true,
        chatIdConfigured: Boolean(envChatId),
        detectedChatId: detectedChat.id,
        chatTitle: detectedChat.title || null,
        chatType: detectedChat.type || null,
        message: 'Group chat ID successfully detected from recent updates.'
      });
    }

    return res.status(200).json({
      botTokenConfigured: true,
      chatIdConfigured: Boolean(envChatId),
      detectedChatId: null,
      message: 'Updates were retrieved, but no group or chat ID was identified.'
    });
  } catch (error: any) {
    return res.status(500).json({
      botTokenConfigured: true,
      chatIdConfigured: Boolean(envChatId),
      detectedChatId: null,
      message: `Failed to contact Telegram API: ${error.message || 'Internal connection error'}`
    });
  }
});

// GET status for inquiry endpoint
app.get(['/api/inquiries', '/api/inquiries/'], (req, res) => {
  res.json({
    status: 'online',
    endpoint: '/api/inquiries',
    method: 'POST',
    description: 'UAJ Web Tech Project Brief submission endpoint'
  });
});

// Endpoint to receive project inquiries and dispatch them to Telegram
app.post(['/api/inquiries', '/api/inquiries/'], async (req, res) => {
  try {
    const result = await dispatchTelegramInquiry(req.body);
    return res.status(result.statusCode).json(result);
  } catch (error: any) {
    console.error('[Telegram Integration] Internal error:', error);
    return res.status(500).json({
      success: false,
      error: `Server encountered an error sending to Telegram: ${error.message || 'Internal error'}`
    });
  }
});

// Vite middleware or production static files
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
