/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBladeSlashGeometry,
  generateManaSparks,
  formatSystemRank
} from './brandTheme.ts';

test('calculateBladeSlashGeometry generates continuous razor path', () => {
  const geo = calculateBladeSlashGeometry(500, 350);
  assert.ok(geo.pathD.startsWith('M'));
  assert.ok(geo.coreD.startsWith('M'));
  assert.ok(geo.startPoint.x < 0, 'Blade slash should start before width boundary');
  assert.ok(geo.endPoint.x > 500, 'Blade slash should extend past right boundary');
  assert.ok(geo.taperThickness > 5, 'Blade thickness should be positive');
});

test('generateManaSparks generates deterministic sparks array', () => {
  const sparksA = generateManaSparks(12, 100);
  const sparksB = generateManaSparks(12, 100);
  assert.equal(sparksA.length, 12);
  assert.deepEqual(sparksA, sparksB, 'Deterministic seed must produce identical spark arrays');
  assert.ok(sparksA[0].radius >= 0.8);
});

test('formatSystemRank assigns correct rank classifications', () => {
  assert.equal(formatSystemRank(99).badge, 'EX');
  assert.equal(formatSystemRank(94).badge, 'S');
  assert.equal(formatSystemRank(85).badge, 'A');
  assert.equal(formatSystemRank(70).badge, 'B');
});
