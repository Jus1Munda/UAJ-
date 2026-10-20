/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { dispatchTelegramInquiry } from '../../src/utils/telegramService.ts';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json'
};

export const handler: Handler = async (event: HandlerEvent, _context: HandlerContext) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: ''
    };
  }

  // Handle health/ping check
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        status: 'online',
        runtime: 'netlify-serverless-function',
        endpoint: '/api/inquiries',
        method: 'POST'
      })
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        error: 'Method Not Allowed. Use POST to submit project briefs.'
      })
    };
  }

  let parsedBody: any = {};
  try {
    parsedBody = event.body ? JSON.parse(event.body) : {};
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        error: 'Invalid JSON request body.'
      })
    };
  }

  const result = await dispatchTelegramInquiry(parsedBody);

  return {
    statusCode: result.statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(result)
  };
};
