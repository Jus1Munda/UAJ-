/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BladeGeometry {
  pathD: string;
  coreD: string;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  taperThickness: number;
}

export interface ManaSpark {
  id: string;
  x: number;
  y: number;
  radius: number;
  delayMs: number;
  durationMs: number;
  opacity: number;
}

/**
 * Calculates geometric coordinates and paths for the electric cyan blade slash.
 */
export function calculateBladeSlashGeometry(
  width: number,
  height: number,
  yOffset: number = 0
): BladeGeometry {
  const startX = -width * 0.08;
  const startY = height * 0.62 + yOffset;
  const endX = width * 1.08;
  const endY = height * 0.38 + yOffset;

  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  const thickness = Math.max(3, height * 0.024);

  // Razor polygon tapering from center to sharp needle tips
  const pathD = `M ${startX.toFixed(1)} ${startY.toFixed(1)} ` +
    `Q ${midX.toFixed(1)} ${(midY - thickness * 1.8).toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)} ` +
    `Q ${midX.toFixed(1)} ${(midY + thickness * 1.8).toFixed(1)}, ${startX.toFixed(1)} ${startY.toFixed(1)} Z`;

  // Inner hyper-bright white core
  const coreThickness = thickness * 0.45;
  const coreD = `M ${(startX + 10).toFixed(1)} ${(startY - 0.5).toFixed(1)} ` +
    `Q ${midX.toFixed(1)} ${(midY - coreThickness).toFixed(1)}, ${(endX - 10).toFixed(1)} ${(endY + 0.5).toFixed(1)} ` +
    `Q ${midX.toFixed(1)} ${(midY + coreThickness).toFixed(1)}, ${(startX + 10).toFixed(1)} ${(startY - 0.5).toFixed(1)} Z`;

  return {
    pathD,
    coreD,
    startPoint: { x: startX, y: startY },
    endPoint: { x: endX, y: endY },
    taperThickness: thickness
  };
}

/**
 * Deterministically generates ember spark coordinates along the slash trajectory
 */
export function generateManaSparks(count: number, seed: number = 42): ManaSpark[] {
  const sparks: ManaSpark[] = [];
  let s = seed;
  const nextRandom = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  for (let i = 0; i < count; i++) {
    const t = 0.15 + nextRandom() * 0.7; // along 15% to 85% of blade
    const slashY = 217 - t * 85;
    const slashX = 30 + t * 440;
    const driftY = (nextRandom() - 0.5) * 36;
    const driftX = (nextRandom() - 0.5) * 20;

    sparks.push({
      id: `spark-${i}-${seed}`,
      x: Math.round(slashX + driftX),
      y: Math.round(slashY + driftY),
      radius: +(0.8 + nextRandom() * 1.8).toFixed(1),
      delayMs: Math.round(nextRandom() * 2000),
      durationMs: Math.round(1400 + nextRandom() * 1600),
      opacity: +(0.3 + nextRandom() * 0.65).toFixed(2)
    });
  }

  return sparks;
}

/**
 * Formats energy/performance index numbers for telemetry display in simple English.
 */
export function formatSystemRank(rating: number): { rank: string; badge: string; color: string; desc: string } {
  if (rating >= 95) return { rank: 'Elite Speed', badge: 'EX', color: '#00f2fe', desc: 'Instant page loads worldwide' };
  if (rating >= 88) return { rank: 'S-Rank Speed', badge: 'S', color: '#38bdf8', desc: 'Under 1 second load times' };
  if (rating >= 78) return { rank: 'Fast Speed', badge: 'A', color: '#8b5cf6', desc: 'Optimized for mobile & desktop' };
  return { rank: 'Standard Speed', badge: 'B', color: '#94a3b8', desc: 'Good baseline performance' };
}
