/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { formatTelegramNotification, formatIndianStandardTime } from './telegramFormat.ts';

export interface DispatchInquiryInput {
  name?: unknown;
  email?: unknown;
  business?: unknown;
  projectType?: unknown;
  budget?: unknown;
  timeline?: unknown;
  details?: unknown;
}

export interface DispatchInquiryResult {
  success: boolean;
  statusCode: number;
  messageId?: number;
  timestamp?: string;
  isoTimestamp?: string;
  error?: string;
}

/**
 * Validates inquiry input and dispatches formatted Telegram notification
 * using TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables.
 * Safe for use in Express (server.ts), Vite Connect middleware, and Netlify Functions.
 */
export async function dispatchTelegramInquiry(
  input: DispatchInquiryInput,
  env: Record<string, string | undefined> = process.env
): Promise<DispatchInquiryResult> {
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const email = typeof input.email === 'string' ? input.email.trim() : '';
  const details = typeof input.details === 'string' ? input.details.trim() : '';
  const business = typeof input.business === 'string' ? input.business.trim() : undefined;
  const projectType = typeof input.projectType === 'string' ? input.projectType.trim() : undefined;
  const budget = typeof input.budget === 'string' ? input.budget.trim() : undefined;
  const timeline = typeof input.timeline === 'string' ? input.timeline.trim() : undefined;

  // Validation
  if (!name) {
    return { success: false, statusCode: 400, error: 'Client name is required.' };
  }
  if (!email) {
    return { success: false, statusCode: 400, error: 'Email address is required.' };
  }
  if (!details) {
    return { success: false, statusCode: 400, error: 'Project description is required.' };
  }

  const botToken = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID || '-5241301089';

  if (!botToken || !botToken.trim()) {
    console.warn('[Telegram Service] Missing TELEGRAM_BOT_TOKEN environment variable.');
    return {
      success: false,
      statusCode: 503,
      error:
        'Telegram delivery is not configured on the server. Please ensure TELEGRAM_BOT_TOKEN environment variable is set in Netlify site settings.'
    };
  }

  // Format message strictly in HTML with IST timestamp
  const telegramMessage = formatTelegramNotification({
    name,
    email,
    business,
    projectType,
    budget,
    timeline,
    details
  });

  const telegramApiUrl = `https://api.telegram.org/bot${botToken.trim()}/sendMessage`;

  try {
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId.trim(),
        text: telegramMessage,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });

    const data: any = await response.json().catch(() => ({}));

    if (!response.ok || !data.ok) {
      console.error('[Telegram Service] Telegram API returned error:', data);
      return {
        success: false,
        statusCode: 502,
        error: `Telegram delivery failed: ${data.description || 'Unknown Telegram error'}`
      };
    }

    const now = new Date();
    return {
      success: true,
      statusCode: 200,
      messageId: data.result?.message_id,
      timestamp: formatIndianStandardTime(now),
      isoTimestamp: now.toISOString()
    };
  } catch (err: any) {
    console.error('[Telegram Service] Network exception during Telegram dispatch:', err);
    return {
      success: false,
      statusCode: 500,
      error: `Server encountered an error sending to Telegram: ${err.message || 'Internal connection error'}`
    };
  }
}
