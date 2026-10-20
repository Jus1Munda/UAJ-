/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json'
};

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: ''
    };
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const envChatId = process.env.TELEGRAM_CHAT_ID;

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      runtime: 'netlify-serverless-function',
      botTokenConfigured: Boolean(botToken && botToken.trim()),
      chatIdConfigured: Boolean(envChatId && envChatId.trim()),
      detectedChatId: envChatId ? Number(envChatId) : -5241301089,
      chatTitle: 'UAJ',
      chatType: 'group',
      message: botToken
        ? 'Telegram bot configuration active on Netlify.'
        : 'TELEGRAM_BOT_TOKEN environment variable not set in Netlify site settings.'
    })
  };
};
