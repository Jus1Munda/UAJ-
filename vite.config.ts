import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { defineConfig, type Plugin } from 'vite';
import { dispatchTelegramInquiry } from './src/utils/telegramService.ts';

/**
 * Native Vite Connect middleware to handle Telegram inquiry requests
 * during local development or when Vite dev server runs without server.ts.
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
              detectedChatId: chatId ? Number(chatId) : null,
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
                const result = await dispatchTelegramInquiry(parsed);

                res.statusCode = result.statusCode;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify(result));
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
