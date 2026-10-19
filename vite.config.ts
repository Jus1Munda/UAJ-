import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { defineConfig, type Plugin } from 'vite';
import { formatTelegramNotification, formatIndianStandardTime } from './src/utils/telegramFormat.ts';

/**
 * Native Vite Connect middleware to handle Telegram inquiry requests
 * even if Vite dev server runs directly without server.ts.
 */
function telegramApiPlugin(): Plugin {
  return {
    name: 'telegram-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';

        // Status check endpoint
        if (url.startsWith('/api/telegram-status')) {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          const botToken = process.env.TELEGRAM_BOT_TOKEN;
          const chatId = process.env.TELEGRAM_CHAT_ID;
          return res.end(
            JSON.stringify({
              botTokenConfigured: Boolean(botToken),
              chatIdConfigured: Boolean(chatId),
              detectedChatId: chatId ? Number(chatId) : -5241301089,
              chatTitle: 'UAJ',
              chatType: 'group',
              message: 'Telegram API endpoint operational.'
            })
          );
        }

        // Inquiries endpoint
        if (url.startsWith('/api/inquiries')) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            return res.end();
          }

          if (req.method === 'GET') {
            res.setHeader('Content-Type', 'application/json');
            return res.end(
              JSON.stringify({
                status: 'online',
                endpoint: '/api/inquiries',
                method: 'POST',
                description: 'UAJ Web Tech Project Brief submission endpoint'
              })
            );
          }

          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });

            req.on('end', async () => {
              try {
                const parsed = JSON.parse(body || '{}');

                if (!parsed.name || typeof parsed.name !== 'string' || !parsed.name.trim()) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ success: false, error: 'Client name is required.' }));
                }
                if (!parsed.email || typeof parsed.email !== 'string' || !parsed.email.trim()) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ success: false, error: 'Email address is required.' }));
                }
                if (!parsed.details || typeof parsed.details !== 'string' || !parsed.details.trim()) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ success: false, error: 'Project description is required.' }));
                }

                const botToken = process.env.TELEGRAM_BOT_TOKEN;
                const chatId = process.env.TELEGRAM_CHAT_ID || '-5241301089';

                if (!botToken || !chatId) {
                  res.statusCode = 503;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(
                    JSON.stringify({
                      success: false,
                      error:
                        'Telegram delivery is not configured on the server. Please ensure TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables are set.'
                    })
                  );
                }

                const telegramMessage = formatTelegramNotification({
                  name: parsed.name,
                  email: parsed.email,
                  business: parsed.business,
                  projectType: parsed.projectType,
                  budget: parsed.budget,
                  timeline: parsed.timeline,
                  details: parsed.details
                });

                const tgResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    chat_id: chatId,
                    text: telegramMessage,
                    parse_mode: 'HTML',
                    disable_web_page_preview: true
                  })
                });

                const tgData: any = await tgResponse.json().catch(() => ({}));

                if (!tgResponse.ok || !tgData.ok) {
                  res.statusCode = 502;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(
                    JSON.stringify({
                      success: false,
                      error: `Telegram delivery failed: ${tgData.description || 'Unknown Telegram error'}`
                    })
                  );
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.end(
                  JSON.stringify({
                    success: true,
                    messageId: tgData.result?.message_id,
                    timestamp: formatIndianStandardTime(new Date()),
                    isoTimestamp: new Date().toISOString()
                  })
                );
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(
                  JSON.stringify({
                    success: false,
                    error: `Server encountered error: ${err.message || 'Internal error'}`
                  })
                );
              }
            });
            return;
          }
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), telegramApiPlugin()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
