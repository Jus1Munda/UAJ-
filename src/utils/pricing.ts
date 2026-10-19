/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const CAPABILITY_PRICE_MAP: Record<string, string> = {
  'Website Design & Development': 'Starting at ₹7,999',
  'UI/UX Design': 'Starting at ₹4,999',
  'Landing Pages': 'Starting at ₹2,999',
  'Presentation Design': 'Starting at ₹1,999',
  'Creative Digital Experiences': 'Starting at ₹8,999',
  'Custom Interactive Solutions': 'Starting at ₹9,999'
};

export const DEFAULT_PRICE_PLACEHOLDER = 'Select a capability first';

/**
 * Returns the estimated starting price for a given project capability in INR (₹).
 */
export function getStartingPrice(capability?: string | null): string {
  if (!capability || !capability.trim()) {
    return DEFAULT_PRICE_PLACEHOLDER;
  }

  const trimmed = capability.trim();

  // Exact match
  if (CAPABILITY_PRICE_MAP[trimmed]) {
    return CAPABILITY_PRICE_MAP[trimmed];
  }

  // Case-insensitive or substring match for custom inquiries
  const lower = trimmed.toLowerCase();
  for (const [key, price] of Object.entries(CAPABILITY_PRICE_MAP)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return price;
    }
  }

  return DEFAULT_PRICE_PLACEHOLDER;
}
