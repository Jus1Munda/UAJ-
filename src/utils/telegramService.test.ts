/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { dispatchTelegramInquiry } from './telegramService.ts';
import { handler as inquiriesHandler } from '../../netlify/functions/inquiries.ts';

test('dispatchTelegramInquiry rejects missing client name with 400', async () => {
  const result = await dispatchTelegramInquiry({
    name: '   ',
    email: 'test@example.com',
    details: 'Project scope'
  });

  assert.equal(result.success, false);
  assert.equal(result.statusCode, 400);
  assert.ok(result.error?.includes('Client name is required'));
});

test('dispatchTelegramInquiry rejects missing email with 400', async () => {
  const result = await dispatchTelegramInquiry({
    name: 'Aarav Sharma',
    email: '',
    details: 'Project scope'
  });

  assert.equal(result.success, false);
  assert.equal(result.statusCode, 400);
  assert.ok(result.error?.includes('Email address is required'));
});

test('dispatchTelegramInquiry rejects missing details with 400', async () => {
  const result = await dispatchTelegramInquiry({
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    details: '   '
  });

  assert.equal(result.success, false);
  assert.equal(result.statusCode, 400);
  assert.ok(result.error?.includes('Project description is required'));
});

test('dispatchTelegramInquiry returns 503 when TELEGRAM_BOT_TOKEN is not set', async () => {
  const result = await dispatchTelegramInquiry(
    {
      name: 'Aarav Sharma',
      email: 'aarav@example.com',
      details: 'Full stack web build'
    },
    { TELEGRAM_BOT_TOKEN: '', TELEGRAM_CHAT_ID: 'mock_chat_id' }
  );

  assert.equal(result.success, false);
  assert.equal(result.statusCode, 503);
  assert.ok(result.error?.includes('TELEGRAM_BOT_TOKEN'));
});

test('dispatchTelegramInquiry returns 503 when TELEGRAM_CHAT_ID is not set', async () => {
  const result = await dispatchTelegramInquiry(
    {
      name: 'Aarav Sharma',
      email: 'aarav@example.com',
      details: 'Full stack web build'
    },
    { TELEGRAM_BOT_TOKEN: 'mock_token', TELEGRAM_CHAT_ID: '' }
  );

  assert.equal(result.success, false);
  assert.equal(result.statusCode, 503);
  assert.ok(result.error?.includes('TELEGRAM_CHAT_ID'));
});

test('Netlify inquiriesHandler handles OPTIONS CORS preflight with 204', async () => {
  const event: any = {
    httpMethod: 'OPTIONS',
    body: null,
    headers: {}
  };

  const response: any = await inquiriesHandler(event, {} as any);
  assert.equal(response.statusCode, 204);
  assert.equal(response.headers['Access-Control-Allow-Origin'], '*');
});

test('Netlify inquiriesHandler handles GET healthcheck with 200', async () => {
  const event: any = {
    httpMethod: 'GET',
    body: null,
    headers: {}
  };

  const response: any = await inquiriesHandler(event, {} as any);
  assert.equal(response.statusCode, 200);
  const data = JSON.parse(response.body);
  assert.equal(data.status, 'online');
  assert.equal(data.runtime, 'netlify-serverless-function');
});

test('Netlify inquiriesHandler handles invalid JSON with 400', async () => {
  const event: any = {
    httpMethod: 'POST',
    body: 'invalid-json{{',
    headers: {}
  };

  const response: any = await inquiriesHandler(event, {} as any);
  assert.equal(response.statusCode, 400);
  const data = JSON.parse(response.body);
  assert.equal(data.success, false);
  assert.ok(data.error?.includes('Invalid JSON'));
});
