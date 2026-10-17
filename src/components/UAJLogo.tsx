/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useId, useState } from 'react';
import { generateManaSparks } from '../utils/brandTheme';

export interface UAJLogoProps {
  className?: string;
  size?: 'navbar' | 'hero' | 'compact' | 'large';
  showAura?: boolean;
  animate?: boolean;
  interactive?: boolean;
  idPrefix?: string;
}

export const UAJLogo: React.FC<UAJLogoProps> = ({
  className = '',
  size = 'hero',
  showAura = true,
  animate = true,
  interactive = true,
  idPrefix
}) => {
  const generatedId = useId().replace(/:/g, '');
  const prefix = idPrefix || `uaj-${generatedId}`;
  const [isHovered, setIsHovered] = useState(false);

  // Sparks along the blade slash
  const sparks = React.useMemo(() => generateManaSparks(9, 77), []);

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none group ${className}`}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      role="img"
      aria-label="UAJ Web Tech Monogram Logo with Solo Leveling aesthetic"
    >
      {/* 1. Surrounding subtle purple/violet mana aura (Breathing glow behind logo) */}
      {showAura && (
        <div
          className={`absolute inset-[-12%] -z-10 rounded-full pointer-events-none transition-all duration-700 ${
            animate ? 'animate-mana-breathe' : 'opacity-50 blur-2xl'
          } ${isHovered ? 'opacity-85 scale-105' : ''}`}
          style={{
            background:
              'radial-gradient(circle at 50% 52%, rgba(139, 92, 246, 0.42) 0%, rgba(109, 40, 217, 0.28) 45%, rgba(6, 4, 15, 0) 75%)',
            filter: 'blur(28px)'
          }}
        />
      )}

      {/* Primary SVG Brandmark */}
      <svg
        viewBox="0 0 520 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible transition-transform duration-300 group-hover:scale-[1.015]"
      >
        <defs>
          {/* Filters */}
          <filter id={`${prefix}-cyanGlow`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur1" />
            <feGaussianBlur stdDeviation="12" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={`${prefix}-redGlow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={`${prefix}-shadowGlow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#000000" floodOpacity="0.85" />
            <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#581c87" floodOpacity="0.35" />
          </filter>

          <filter id={`${prefix}-auraBlur`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="22" />
          </filter>

          {/* Gradients */}
          {/* Metallic Obsidian - Light / Bevel Highlight */}
          <linearGradient id={`${prefix}-steelLight`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bfa6d9" />
            <stop offset="35%" stopColor="#7a5c9e" />
            <stop offset="70%" stopColor="#3d2a58" />
            <stop offset="100%" stopColor="#1e1430" />
          </linearGradient>

          {/* Metallic Obsidian - Dark / Shadow Face */}
          <linearGradient id={`${prefix}-steelDark`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c1e42" />
            <stop offset="50%" stopColor="#150e24" />
            <stop offset="100%" stopColor="#090611" />
          </linearGradient>

          {/* Dagger Apex Edge Sheen */}
          <linearGradient id={`${prefix}-chiselSpine`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#3b0764" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#170f2b" stopOpacity="0.2" />
          </linearGradient>

          {/* Electric Neon Cyan Blade Gradient */}
          <linearGradient id={`${prefix}-bladeGradient`} x1="0%" y1="70%" x2="100%" y2="30%">
            <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.3" />
            <stop offset="15%" stopColor="#00f2fe" stopOpacity="0.9" />
            <stop offset="48%" stopColor="#e0f2fe" stopOpacity="1" />
            <stop offset="52%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="85%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
          </linearGradient>

          {/* Cyan Shimmer Sweep for Blade Slash */}
          <linearGradient id={`${prefix}-bladeShimmer`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#67e8f9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Crimson Flare Radial Bloom */}
          <radialGradient id={`${prefix}-crimsonRadial`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="25%" stopColor="#ff1744" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#d50000" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7f0000" stopOpacity="0" />
          </radialGradient>

          {/* Crimson Diffraction Ray Gradient */}
          <linearGradient id={`${prefix}-crimsonRayH`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ff1744" stopOpacity="0" />
            <stop offset="48%" stopColor="#ff5252" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="52%" stopColor="#ff5252" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff1744" stopOpacity="0" />
          </linearGradient>

          <linearGradient id={`${prefix}-crimsonRayDiag`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff1744" stopOpacity="0" />
            <stop offset="45%" stopColor="#ff1744" stopOpacity="0.65" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#ff1744" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ff1744" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient SVG Mana Aura Background */}
        <ellipse
          cx="260"
          cy="185"
          rx="180"
          ry="110"
          fill="rgba(124, 58, 237, 0.22)"
          filter={`url(#${prefix}-auraBlur)`}
        />

        {/* ============================================================== */}
        {/* MONOGRAM LETTER BODY (U - A - J) WITH CHISELED STEEL FACETS   */}
        {/* ============================================================== */}
        <g filter={`url(#${prefix}-shadowGlow)`}>
          {/* ------------------------- LETTER U ------------------------- */}
          {/* U Left Half (Illuminated Steel) */}
          <path
            d="M 80 115 L 70 115 L 56 122 L 76 138 L 76 218 C 76 250, 102 272, 130 274 L 130 248 C 114 246, 100 234, 100 215 L 100 138 L 118 138 L 126 128 L 112 115 Z"
            fill={`url(#${prefix}-steelLight)`}
            stroke="#9f75c2"
            strokeWidth="0.8"
          />

          {/* U Right Half (Deep Obsidian Shadow Face) */}
          <path
            d="M 130 274 C 158 272, 184 250, 184 218 L 184 138 L 202 138 L 194 122 L 180 115 L 148 115 L 156 128 L 160 138 L 160 215 C 160 234, 146 246, 130 248 Z"
            fill={`url(#${prefix}-steelDark)`}
            stroke="#473263"
            strokeWidth="0.8"
          />

          {/* U Chiseled Ridge & Corner Highlights */}
          <path
            d="M 56 122 L 76 138 M 76 138 L 76 218 M 130 248 L 130 274 M 184 138 L 194 122"
            stroke="#c4b5fd"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* U Runic Inscriptions (Faint Elder Futhark Glyphs) */}
          <g stroke="rgba(192, 132, 252, 0.45)" strokeWidth="1.4" strokeLinecap="round" fill="none">
            {/* Left Stem Runes */}
            <path d="M 88 152 L 88 178 M 88 158 L 96 154 M 88 168 L 96 164" /> {/* Fehu/Ansuz style */}
            <path d="M 88 190 L 88 214 M 88 198 L 95 204 L 88 210" />
            {/* Bottom Curve Runes */}
            <path d="M 112 258 L 120 252 L 128 258" />
            <path d="M 148 258 L 156 252 L 164 258" />
            {/* Right Stem Runes */}
            <path d="M 172 152 L 172 176 M 172 158 L 164 166 M 172 166 L 164 174" />
            <path d="M 172 188 L 172 212 M 165 196 L 172 202 L 179 196" />
          </g>

          {/* ------------------------- LETTER A ------------------------- */}
          {/* A Left Blade / Facet (Towering Dagger Apex to Downward Dagger Spike) */}
          <path
            d="M 260 52 L 258 58 L 172 245 L 164 278 L 180 258 L 222 230 L 260 142 Z"
            fill={`url(#${prefix}-steelLight)`}
            stroke="#9f75c2"
            strokeWidth="0.8"
          />

          {/* A Right Blade / Facet (Obsidian Shadow & Downward Dagger Spike) */}
          <path
            d="M 260 52 L 262 58 L 348 245 L 356 278 L 340 258 L 298 230 L 260 142 Z"
            fill={`url(#${prefix}-steelDark)`}
            stroke="#473263"
            strokeWidth="0.8"
          />

          {/* A Center Chiseled Dagger Spine / Ridge */}
          <line
            x1="260"
            y1="52"
            x2="260"
            y2="142"
            stroke={`url(#${prefix}-chiselSpine)`}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* A Inner Triangular Dagger Guard Void */}
          <path
            d="M 260 152 L 228 226 L 292 226 Z"
            fill="#080612"
            stroke="#2e1065"
            strokeWidth="1"
          />

          {/* A Runic Inscriptions */}
          <g stroke="rgba(216, 180, 254, 0.45)" strokeWidth="1.4" strokeLinecap="round" fill="none">
            {/* Left Leg Runes */}
            <path d="M 224 165 L 214 185 M 216 170 L 224 175" />
            <path d="M 205 198 L 195 218 M 198 203 L 206 208" />
            {/* Right Leg Runes */}
            <path d="M 296 165 L 306 185 M 304 170 L 296 175" />
            <path d="M 315 198 L 325 218 M 322 203 L 314 208" />
          </g>

          {/* ------------------------- LETTER J ------------------------- */}
          {/* J Top Crossbar with Dual Dagger Horns */}
          <path
            d="M 330 115 L 342 128 L 436 128 L 448 115 L 438 138 L 340 138 Z"
            fill={`url(#${prefix}-steelLight)`}
            stroke="#9f75c2"
            strokeWidth="0.8"
          />

          {/* J Stem & Hook - Left/Inner Facet */}
          <path
            d="M 390 138 L 390 225 C 390 248, 370 262, 344 262 L 344 238 C 358 238, 368 230, 368 218 L 368 138 Z"
            fill={`url(#${prefix}-steelLight)`}
            stroke="#9f75c2"
            strokeWidth="0.8"
          />

          {/* J Stem & Hook - Right/Outer Facet */}
          <path
            d="M 390 138 L 414 138 L 414 218 C 414 250, 382 272, 344 274 L 344 262 C 370 262, 390 248, 390 225 Z"
            fill={`url(#${prefix}-steelDark)`}
            stroke="#473263"
            strokeWidth="0.8"
          />

          {/* J Runic Inscriptions */}
          <g stroke="rgba(192, 132, 252, 0.45)" strokeWidth="1.4" strokeLinecap="round" fill="none">
            {/* Top Bar Runes */}
            <path d="M 358 122 L 358 132 M 358 124 L 364 127" />
            <path d="M 374 122 L 374 132 M 371 125 L 377 129" />
            <path d="M 406 122 L 406 132 M 406 124 L 412 127" />
            <path d="M 422 122 L 422 132 M 419 125 L 425 129" />
            {/* Stem Runes */}
            <path d="M 402 150 L 402 174 M 402 156 L 396 162" />
            <path d="M 402 186 L 402 210 M 396 194 L 402 200 L 408 194" />
          </g>
        </g>

        {/* ============================================================== */}
        {/* ELECTRIC NEON CYAN BLADE SLASH CUTTING THROUGH THE LETTERS    */}
        {/* ============================================================== */}
        <g id={`${prefix}-blade-slash-group`}>
          {/* 1. Deep Cyan Ambient Glow Layer */}
          <path
            d="M 12 238 Q 260 162, 508 132 Q 260 178, 12 238 Z"
            fill="#00f2fe"
            opacity="0.65"
            filter={`url(#${prefix}-cyanGlow)`}
          />

          {/* 2. Main Razor Blade Polygon (Electric Neon Cyan Core) */}
          <path
            d="M 14 238 Q 260 162, 506 132 Q 260 176, 14 238 Z"
            fill={`url(#${prefix}-bladeGradient)`}
          />

          {/* 3. Pure White-Hot Kinetic Center Razor Line */}
          <path
            d="M 32 234 Q 260 168, 488 134"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
            filter="drop-shadow(0 0 6px #00f2fe)"
          />

          {/* 4. Crackling Lightning Tendrils / Electric Arcs */}
          <g
            className={animate ? 'animate-lightning' : ''}
            stroke="#67e8f9"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.9"
          >
            {/* Upper electric branch */}
            <path d="M 70 230 L 98 222 L 115 227 L 145 214 L 180 206 L 205 211 L 240 188 L 275 180 L 310 174 L 342 179 L 385 162 L 420 152 L 445 146" />
            {/* Lower electric branch */}
            <path d="M 120 236 L 140 242 L 175 228 L 210 220 L 235 226 L 270 205 L 305 196 L 330 202 L 370 186 L 405 174 L 430 168" />
            {/* Vertical micro-arcs */}
            <path d="M 185 204 L 182 216 M 275 178 L 278 190 M 365 168 L 362 180" />
          </g>

          {/* 5. Animated Shimmer / Sweep Effect across blade */}
          {animate && (
            <g clipPath={`url(#${prefix}-bladeClip)`}>
              <clipPath id={`${prefix}-bladeClip`}>
                <path d="M 14 238 Q 260 162, 506 132 Q 260 176, 14 238 Z" />
              </clipPath>
              <rect
                x="-100"
                y="100"
                width="220"
                height="180"
                fill={`url(#${prefix}-bladeShimmer)`}
                className="animate-blade-sweep"
                transform="rotate(-12, 260, 180)"
              />
            </g>
          )}

          {/* 6. Mana Sparks along the slash trajectory */}
          <g>
            {sparks.map((spark) => (
              <circle
                key={spark.id}
                cx={spark.x}
                cy={spark.y}
                r={spark.radius}
                fill="#a5f3fc"
                opacity={spark.opacity}
                filter="drop-shadow(0 0 3px #00f2fe)"
                className={animate ? 'animate-pulse' : ''}
                style={{
                  animationDelay: `${spark.delayMs}ms`,
                  animationDuration: `${spark.durationMs}ms`
                }}
              />
            ))}
          </g>
        </g>

        {/* ============================================================== */}
        {/* SUBTLE GLOWING CRIMSON / RED ACCENT STAR FLARE (#ff1744)       */}
        {/* Placed at the bottom-right dagger tip of the 'A' (x:356, y:278) */}
        {/* ============================================================== */}
        <g
          id={`${prefix}-crimson-flare`}
          className={animate ? 'animate-red-flare' : ''}
          style={{ transformOrigin: '356px 278px' }}
        >
          {/* Soft Crimson Radial Bloom */}
          <circle
            cx="356"
            cy="278"
            r="44"
            fill={`url(#${prefix}-crimsonRadial)`}
            opacity="0.85"
          />

          {/* Long Diagonal Diffraction Ray (aligning with slash angle) */}
          <line
            x1="290"
            y1="344"
            x2="422"
            y2="212"
            stroke={`url(#${prefix}-crimsonRayDiag)`}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Secondary Diagonal Flare Ray */}
          <line
            x1="300"
            y1="222"
            x2="412"
            y2="334"
            stroke={`url(#${prefix}-crimsonRayDiag)`}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.65"
          />

          {/* Horizontal Star Spike */}
          <line
            x1="306"
            y1="278"
            x2="406"
            y2="278"
            stroke={`url(#${prefix}-crimsonRayH)`}
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Vertical Star Spike */}
          <line
            x1="356"
            y1="228"
            x2="356"
            y2="328"
            stroke={`url(#${prefix}-crimsonRayH)`}
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Central 4-Point Brilliant Star Core */}
          <path
            d="M 356 254 Q 356 278, 376 278 Q 356 278, 356 302 Q 356 278, 336 278 Q 356 278, 356 254 Z"
            fill="#ffffff"
            filter={`url(#${prefix}-redGlow)`}
          />

          {/* Ultra-hot crimson center dot */}
          <circle cx="356" cy="278" r="3.2" fill="#ffffff" />
          <circle cx="356" cy="278" r="1.8" fill="#ffebee" />
        </g>
      </svg>
    </div>
  );
};
