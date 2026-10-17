/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { filterInquiries, INITIAL_INQUIRIES } from './inquiryStorage.ts';

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
