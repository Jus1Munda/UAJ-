/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { escapeTelegramHtml, formatTelegramNotification, formatIndianStandardTime } from './telegramFormat.ts';

test('escapeTelegramHtml escapes HTML entities for Telegram HTML mode', () => {
  assert.equal(escapeTelegramHtml('<script>alert("hack" & \'test\')</script>'), '&lt;script&gt;alert(&quot;hack&quot; &amp; &#039;test&#039;)&lt;/script&gt;');
  assert.equal(escapeTelegramHtml('Plain text'), 'Plain text');
  assert.equal(escapeTelegramHtml(''), '');
});

test('formatIndianStandardTime converts UTC date to Asia/Kolkata with IST suffix', () => {
  // 4:26 AM UTC corresponds to 9:56 AM IST (UTC+05:30)
  const utcDate = new Date('2026-10-19T04:26:00.000Z');
  const istFormatted = formatIndianStandardTime(utcDate);

  assert.equal(istFormatted, 'Oct 19, 2026, 9:56 AM IST');
});

test('formatTelegramNotification formats heading and all client fields neatly in IST', () => {
  const result = formatTelegramNotification({
    name: 'Siddharth Patel',
    email: 'sid@startup.io',
    business: 'Nexus AI Labs',
    projectType: 'Website Design & Development',
    budget: 'Starting at ₹7,999',
    timeline: '1 - 2 Months',
    details: 'Need a dark sleek site with custom 3D interactions.',
    submittedAt: 'Oct 19, 2026, 9:56 AM IST'
  });

  assert.ok(result.includes('New Client Inquiry — UAJ WEB TECH'));
  assert.ok(result.includes('Siddharth Patel'));
  assert.ok(result.includes('sid@startup.io'));
  assert.ok(result.includes('Nexus AI Labs'));
  assert.ok(result.includes('Website Design &amp; Development'));
  assert.ok(result.includes('Starting at ₹7,999'));
  assert.ok(result.includes('1 - 2 Months'));
  assert.ok(result.includes('Need a dark sleek site with custom 3D interactions.'));
  assert.ok(result.includes('Oct 19, 2026, 9:56 AM IST'));
  assert.ok(!result.includes('UTC · Web Studio Form'));
});

test('formatTelegramNotification automatically generates IST timestamp when submittedAt is omitted', () => {
  const result = formatTelegramNotification({
    name: 'Alice',
    email: 'alice@example.com',
    details: 'Project scope details'
  });

  assert.ok(result.includes('Not specified'));
  assert.ok(result.includes('New Client Inquiry — UAJ WEB TECH'));
  assert.ok(result.includes('IST · Web Studio Form'));
  assert.ok(!result.includes('UTC · Web Studio Form'));
});

test('formatTelegramNotification formats private_portfolio_request with dedicated heading and fields', () => {
  const result = formatTelegramNotification({
    name: 'Elena Rostova',
    email: 'elena@vanguard.tech',
    business: 'Vanguard Systems',
    details: 'Interested in evaluating enterprise case studies for an upcoming fintech architecture redesign.',
    requestType: 'private_portfolio_request',
    submittedAt: 'Oct 20, 2026, 11:15 AM IST'
  });

  assert.ok(result.includes('Private Portfolio Access Request — UAJ WEB TECH'));
  assert.ok(result.includes('Elena Rostova'));
  assert.ok(result.includes('elena@vanguard.tech'));
  assert.ok(result.includes('Vanguard Systems'));
  assert.ok(result.includes('<code>private_portfolio_request</code>'));
  assert.ok(result.includes('Reason for Access:'));
  assert.ok(result.includes('Interested in evaluating enterprise case studies'));
  assert.ok(result.includes('Oct 20, 2026, 11:15 AM IST · Portfolio Access Form'));
});
