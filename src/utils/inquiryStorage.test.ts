/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { filterInquiries, INITIAL_INQUIRIES } from './inquiryStorage.ts';
import { getStartingPrice } from './pricing.ts';

test('filterInquiries filters correctly by status', () => {
  const newOnes = filterInquiries(INITIAL_INQUIRIES, '', 'New');
  assert.equal(newOnes.length, 1);
  assert.equal(newOnes[0].name, 'Marcus Chen');
});

test('filterInquiries searches across name and email', () => {
  const searchResult = filterInquiries(INITIAL_INQUIRIES, 'elena', 'All');
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].email, 'elena@vanguardia.design');
});

test('filterInquiries handles empty queries and all statuses', () => {
  const all = filterInquiries(INITIAL_INQUIRIES, '', 'All');
  assert.equal(all.length, INITIAL_INQUIRIES.length);
});

test('getStartingPrice returns exact mapped starting prices', () => {
  assert.equal(getStartingPrice('Website Design & Development'), 'Starting at ₹7,999');
  assert.equal(getStartingPrice('UI/UX Design'), 'Starting at ₹4,999');
  assert.equal(getStartingPrice('Landing Pages'), 'Starting at ₹2,999');
  assert.equal(getStartingPrice('Presentation Design'), 'Starting at ₹1,999');
  assert.equal(getStartingPrice('Creative Digital Experiences'), 'Starting at ₹8,999');
  assert.equal(getStartingPrice('Custom Interactive Solutions'), 'Starting at ₹9,999');
  assert.equal(getStartingPrice(''), 'Select a capability first');
  assert.equal(getStartingPrice('Unknown service'), 'Select a capability first');
});
