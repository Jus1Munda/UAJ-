/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { formatTelegramNotification, formatIndianStandardTime } from './telegramFormat.ts';

export interface DispatchInquiryInput {
  name?: unknown;
  email?: unknown;
  business?: unknown;
  company?: unknown;
  projectType?: unknown;
  budget?: unknown;
  timeline?: unknown;
  details?: unknown;
  reason?: unknown;
  requestType?: unknown;
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
  const requestType = typeof input.requestType === 'string' ? input.requestType.trim() : undefined;
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const email = typeof input.email === 'string' ? input.email.trim() : '';
  const rawDetails =
    typeof input.details === 'string' && input.details.trim()
      ? input.details.trim()
      : typeof input.reason === 'string' && input.reason.trim()
        ? input.reason.trim()
        : '';
  const details = rawDetails;

  const rawBusiness =
    typeof input.business === 'string' && input.business.trim()
      ? input.business.trim()
      : typeof input.company === 'string' && input.company.trim()
        ? input.company.trim()
        : undefined;
  const business = rawBusiness;

  const projectType =
    typeof input.projectType === 'string' && input.projectType.trim()
      ? input.projectType.trim()
      : requestType === 'private_portfolio_request'
        ? 'Private Portfolio Access'
        : undefined;

  const budget =
    typeof input.budget === 'string' && input.budget.trim()
      ? input.budget.trim()
      : requestType === 'private_portfolio_request'
        ? 'Portfolio Access Request'
        : undefined;

  const timeline =
    typeof input.timeline === 'string' && input.timeline.trim()
      ? input.timeline.trim()
      : requestType === 'private_portfolio_request'
        ? 'Immediate'
        : undefined;

  // Validation
  if (!name) {
    return { success: false, statusCode: 400, error: 'Client name is required.' };
  }
  if (!email) {
    return { success: false, statusCode: 400, error: 'Email address is required.' };
  }
  if (!details) {
    return {
      success: false,
      statusCode: 400,
      error:
        requestType === 'private_portfolio_request'
          ? 'Reason for requesting access is required.'
          : 'Project description is required.'
    };
  }

  const botToken = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;

  if (!botToken || !botToken.trim()) {
    console.warn('[Telegram Service] Missing TELEGRAM_BOT_TOKEN environment variable.');
    return {
      success: false,
      statusCode: 503,
      error:
        'Telegram delivery is not configured on the server. Please ensure TELEGRAM_BOT_TOKEN environment variable is set in Netlify site settings.'
    };
  }

  if (!chatId || !chatId.trim()) {
    console.warn('[Telegram Service] Missing TELEGRAM_CHAT_ID environment variable.');
    return {
      success: false,
      statusCode: 503,
      error:
        'Telegram delivery is not configured on the server. Please ensure TELEGRAM_CHAT_ID environment variable is set in Netlify site settings.'
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
    details,
    requestType
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
