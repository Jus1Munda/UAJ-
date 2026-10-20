/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface InquiryTelegramPayload {
  name: string;
  email: string;
  business?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  details: string;
  submittedAt?: string;
  requestType?: string;
}

/**
 * Escapes characters that have special meaning in Telegram HTML parse mode.
 */
export function escapeTelegramHtml(text?: string | null): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Converts any Date / timestamp string to Indian Standard Time (IST, Asia/Kolkata, UTC+05:30)
 * Example output: "Oct 19, 2026, 9:56 AM IST"
 */
export function formatIndianStandardTime(inputDate?: Date | string | number): string {
  const date = inputDate instanceof Date ? inputDate : (inputDate ? new Date(inputDate) : new Date());

  const formatted = date.toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return `${formatted} IST`;
}

/**
 * Generates the clean formatted Telegram notification text with the exact required heading
 * and timestamps localized in Indian Standard Time (IST).
 */
export function formatTelegramNotification(data: InquiryTelegramPayload): string {
  const safeName = escapeTelegramHtml(data.name?.trim());
  const safeEmail = escapeTelegramHtml(data.email?.trim());
  const safeBusiness = data.business && data.business.trim() ? escapeTelegramHtml(data.business.trim()) : 'Not specified';
  const safeCapability = data.projectType && data.projectType.trim() ? escapeTelegramHtml(data.projectType.trim()) : 'Website Design & Development';
  const safeBudget = data.budget && data.budget.trim() ? escapeTelegramHtml(data.budget.trim()) : 'Calculated Starting Price';
  const safeTimeline = data.timeline && data.timeline.trim() ? escapeTelegramHtml(data.timeline.trim()) : 'Flexible';
  const safeDetails = escapeTelegramHtml(data.details?.trim());

  // Use the provided date or current date, formatted in Asia/Kolkata IST
  const timestamp = data.submittedAt || formatIndianStandardTime(new Date());

  if (data.requestType === 'private_portfolio_request') {
    return [
      `🔒 <b>Private Portfolio Access Request — UAJ WEB TECH</b>`,
      ``,
      `👤 <b>Visitor Name:</b> ${safeName}`,
      `📧 <b>Contact Email:</b> ${safeEmail}`,
      `🏢 <b>Company / Org:</b> ${safeBusiness}`,
      `🏷 <b>Request Type:</b> <code>private_portfolio_request</code>`,
      ``,
      `📝 <b>Reason for Access:</b>`,
      safeDetails,
      ``,
      `📅 <i>Submitted at: ${timestamp} · Portfolio Access Form</i>`
    ].join('\n');
  }

  return [
    `⚡ <b>New Client Inquiry — UAJ WEB TECH</b>`,
    ``,
    `👤 <b>Client Name:</b> ${safeName}`,
    `📧 <b>Contact Email:</b> ${safeEmail}`,
    `🏢 <b>Business / Org:</b> ${safeBusiness}`,
    `🛠 <b>Required Service:</b> ${safeCapability}`,
    `💰 <b>Estimated Budget:</b> ${safeBudget}`,
    `⏱ <b>Deadline / Timeline:</b> ${safeTimeline}`,
    ``,
    `📝 <b>Project Description:</b>`,
    safeDetails,
    ``,
    `📅 <i>Submitted at: ${timestamp} · Web Studio Form</i>`
  ].join('\n');
}
