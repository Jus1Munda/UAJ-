/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useId, useState, useEffect } from 'react';
import { NXCinematicCanvas } from './NXCinematicCanvas';

export interface UAJLogoProps {
  className?: string;
  size?: 'navbar' | 'hero' | 'compact' | 'large' | 'mobile';
  showAura?: boolean;
  animate?: boolean;
  interactive?: boolean;
  idPrefix?: string;
  triggerKey?: number;
  onSlashTrigger?: () => void;
  renderParticles?: boolean;
}

export type NuwayXLogoProps = UAJLogoProps;

export const UAJLogo: React.FC<UAJLogoProps> = ({
  className = '',
  size = 'hero',
  showAura = false,
  animate = true,
  interactive = true,
  idPrefix,
  triggerKey = 0,
  onSlashTrigger,
  renderParticles = true
}) => {
  const generatedId = useId().replace(/:/g, '');
  const prefix = idPrefix || `nuwayx-${generatedId}`;
  const [isHovered, setIsHovered] = useState(false);
  const [internalTriggerKey, setInternalTriggerKey] = useState(0);
  const [slashAnimating, setSlashAnimating] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  // Trigger slash animation sequence
  const activateSlash = () => {
    if (!animate) return;
    setInternalTriggerKey((prev) => prev + 1);
    setSlashAnimating(true);
    if (onSlashTrigger) {
      onSlashTrigger();
    }

    // Sequence duration ~1.4s before settling into idle state
    window.setTimeout(() => {
      setSlashAnimating(false);
    }, 1400);
  };

  // Watch external triggerKey prop
  useEffect(() => {
    if (triggerKey > 0) {
      activateSlash();
    }
  }, [triggerKey]);

  // Initial activation on mount
  useEffect(() => {
    if (animate) {
      setSlashAnimating(true);
      const timer = window.setTimeout(() => {
        setSlashAnimating(false);
      }, 1400);
      return () => window.clearTimeout(timer);
    }
  }, [animate]);

  // Handle click / tap interaction
  const handleClick = (e: React.MouseEvent) => {
    if (interactive) {
      e.stopPropagation();
      activateSlash();
    }
  };

  const isNavbar = size === 'navbar';
  const density = isNavbar ? 'low' : size === 'hero' ? 'normal' : 'normal';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none bg-transparent group ${className}`}
      onMouseEnter={() => {
        if (interactive) {
          setIsHovered(true);
          activateSlash();
        }
      }}
      onMouseLeave={() => {
        if (interactive) setIsHovered(false);
      }}
      onClick={handleClick}
      role="img"
      aria-label="NuwayX Tech Monogram Logo with 3D Lavender NX, Cherry Blossom animated blade and sakura petals, and Blue Thunder star"
      style={{
        cursor: interactive ? 'pointer' : 'default',
        background: 'transparent'
      }}
    >
      {/* ============================================================== */}
      {/* 1. BACKGROUND CANVAS LAYER                                     */}
      {/* Translucent flowing energy ribbons & depth petals (transparent)*/}
      {/* ============================================================== */}
      {animate && renderParticles && !reducedMotion && (
        <NXCinematicCanvas
          layer="background"
          triggerKey={internalTriggerKey}
          interactive={interactive}
          isHovered={isHovered}
          reducedMotion={reducedMotion}
          density={density}
          className="z-0 pointer-events-none"
        />
      )}

      {/* ============================================================== */}
      {/* 2. VECTOR 3D MONOGRAM (NX) & BLADE SLASH GEOMETRY              */}
      {/* Refined metallic lavender/violet materials with no floor       */}
      {/* ============================================================== */}
      <svg
        viewBox="0 0 520 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible relative z-10 transition-transform duration-300 group-hover:scale-[1.012]"
        style={{ background: 'transparent' }}
      >
        <defs>
          {/* Subtle Ambient Contact Shadow: very light and tight, NO platform/floor effect */}
          <filter id={`${prefix}-nxContact`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#05030a" floodOpacity="0.4" />
          </filter>

          {/* Controlled Cherry Blossom Blade Ambient Glow Filter */}
          <filter id={`${prefix}-bladeGlow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur1" />
            <feGaussianBlur stdDeviation="5.5" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* ============================================================== */}
          {/* VIBRANT 3D LAVENDER & SATURATED VIOLET MATERIALS (SECTION 1)   */}
          {/* Rich saturated violet, electric lavender, pink-lavender sheen  */}
          {/* ============================================================== */}
          {/* Primary Front-Facing Facet: Saturated electric lavender & vibrant purple */}
          <linearGradient id={`${prefix}-frontLavender`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdf4ff" />   {/* Controlled pale highlight */}
            <stop offset="4%" stopColor="#e9d5ff" />   {/* Soft pink-lavender */}
            <stop offset="16%" stopColor="#c084fc" />  {/* Vibrant electric lavender */}
            <stop offset="38%" stopColor="#a855f7" />  {/* Rich saturated purple */}
            <stop offset="64%" stopColor="#9333ea" />  {/* Luminous electric violet */}
            <stop offset="84%" stopColor="#7e22ce" />  {/* Deep royal violet */}
            <stop offset="100%" stopColor="#581c87" /> {/* Saturated dark violet base */}
          </linearGradient>

          {/* Secondary Front-Facing Facet: Soft pink-lavender reflections & magenta sheen */}
          <linearGradient id={`${prefix}-facetSheen`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fae8ff" />   {/* Delicate pale pink highlight */}
            <stop offset="8%" stopColor="#f5d0fe" />   {/* Soft pink-lavender sheen */}
            <stop offset="24%" stopColor="#d946ef" />  {/* Vibrant magenta-lavender reflection */}
            <stop offset="50%" stopColor="#a855f7" />  {/* Rich electric purple */}
            <stop offset="78%" stopColor="#7e22ce" />  {/* Saturated violet */}
            <stop offset="100%" stopColor="#4c1d95" /> {/* Deep violet base */}
          </linearGradient>

          {/* Deep Saturated Violet 3D Dimensional Shadow Facets (Side faces & bevels) */}
          <linearGradient id={`${prefix}-sideBevelShadow`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#581c87" />  {/* Saturated deep violet */}
            <stop offset="30%" stopColor="#3b0764" /> {/* Rich royal purple */}
            <stop offset="65%" stopColor="#22063d" /> {/* Saturated obsidian violet */}
            <stop offset="100%" stopColor="#110220" /> {/* Crevice depth */}
          </linearGradient>

          {/* Dagger Apex Edge Spine: Controlled highlight into pink-lavender */}
          <linearGradient id={`${prefix}-chiselSpine`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fdf4ff" stopOpacity="0.95" />
            <stop offset="12%" stopColor="#f5d0fe" stopOpacity="0.88" />
            <stop offset="38%" stopColor="#c084fc" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#9333ea" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#581c87" stopOpacity="0.55" />
          </linearGradient>

          {/* ============================================================== */}
          {/* VIVID CHERRY BLOSSOM BLADE PALETTE (SECTION 1)                 */}
          {/* Core: Sakura/rose pink, edges: cherry red, highlight: pink-white*/}
          {/* ============================================================== */}
          <linearGradient id={`${prefix}-bladeSakura`} x1="0%" y1="70%" x2="100%" y2="30%">
            <stop offset="0%" stopColor="#be123c" stopOpacity="0.88" />   {/* Deep cherry red edge */}
            <stop offset="14%" stopColor="#e11d48" stopOpacity="0.95" />  {/* Crimson rose */}
            <stop offset="32%" stopColor="#f43f5e" stopOpacity="1" />     {/* Rose pink */}
            <stop offset="46%" stopColor="#fb7185" stopOpacity="1" />     {/* Vivid Sakura pink */}
            <stop offset="50%" stopColor="#ffe4e6" stopOpacity="1" />     {/* Bright pink-white central highlight */}
            <stop offset="54%" stopColor="#fb7185" stopOpacity="1" />     {/* Vivid Sakura pink */}
            <stop offset="68%" stopColor="#f43f5e" stopOpacity="1" />     {/* Rose pink */}
            <stop offset="86%" stopColor="#e11d48" stopOpacity="0.95" />  {/* Crimson rose */}
            <stop offset="100%" stopColor="#be123c" stopOpacity="0.88" /> {/* Deep cherry red edge */}
          </linearGradient>

          {/* Luminous Cherry Blossom Pink Shimmer */}
          <linearGradient id={`${prefix}-bladeShimmer`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e11d48" stopOpacity="0" />
            <stop offset="25%" stopColor="#f43f5e" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#ffe4e6" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#fb7185" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#be123c" stopOpacity="0" />
          </linearGradient>

          {/* Dynamic Blade Sweep Clip Path */}
          <clipPath id={`${prefix}-bladeClip`}>
            <path d="M 14 238 Q 260 162, 506 132 Q 260 176, 14 238 Z" />
          </clipPath>
        </defs>

        {/* Optional ultra-subtle ambient mana aura only if explicitly requested */}
        {showAura && (
          <ellipse
            cx="260"
            cy="170"
            rx="180"
            ry="90"
            fill="url(#auragrad)"
            opacity="0.1"
            className={animate ? 'animate-mana-breathe' : ''}
          />
        )}
        <defs>
          <radialGradient id="auragrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ============================================================== */}
        {/* MONOGRAM LETTER BODY (NUWAYX "NX")                             */}
        {/* Refined 3D Metallic Lavender & Violet Geometry                 */}
        {/* ============================================================== */}
        <g filter={`url(#${prefix}-nxContact)`}>
          {/* ------------------------- LETTER N ------------------------- */}
          {/* N Left Upright Blade - Light Facet */}
          <path
            d="M 104 62 L 72 108 L 84 246 L 104 274 L 104 62 Z"
            fill={`url(#${prefix}-frontLavender)`}
            stroke="#8b5cf6"
            strokeWidth="0.65"
            strokeOpacity="0.45"
          />

          {/* N Left Upright Blade - Shadow Facet (Deep Violet Side Face) */}
          <path
            d="M 104 62 L 104 274 L 122 248 L 122 118 L 104 62 Z"
            fill={`url(#${prefix}-sideBevelShadow)`}
            stroke="#581c87"
            strokeWidth="0.65"
            strokeOpacity="0.45"
          />

          {/* N Chiseled Left Spine */}
          <line
            x1="104"
            y1="62"
            x2="104"
            y2="274"
            stroke={`url(#${prefix}-chiselSpine)`}
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          {/* N Center Diagonal Blade - Light Facet */}
          <path
            d="M 104 62 L 138 62 L 226 238 L 226 274 L 192 274 L 104 102 Z"
            fill={`url(#${prefix}-facetSheen)`}
            stroke="#8b5cf6"
            strokeWidth="0.65"
            strokeOpacity="0.45"
          />

          {/* N Diagonal Underbelly - Shadow Facet */}
          <path
            d="M 104 102 L 192 274 L 210 274 L 122 122 Z"
            fill={`url(#${prefix}-sideBevelShadow)`}
            stroke="#3b0764"
            strokeWidth="0.65"
            strokeOpacity="0.45"
          />

          {/* N Center Diagonal Spine */}
          <line
            x1="120"
            y1="82"
            x2="210"
            y2="256"
            stroke={`url(#${prefix}-chiselSpine)`}
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          {/* N Right Upright Blade - Light Facet */}
          <path
            d="M 226 62 L 208 116 L 208 248 L 226 274 L 226 62 Z"
            fill={`url(#${prefix}-frontLavender)`}
            stroke="#8b5cf6"
            strokeWidth="0.65"
            strokeOpacity="0.45"
          />

          {/* N Right Upright Blade - Shadow Facet */}
          <path
            d="M 226 62 L 226 274 L 244 246 L 258 108 L 226 62 Z"
            fill={`url(#${prefix}-sideBevelShadow)`}
            stroke="#581c87"
            strokeWidth="0.65"
            strokeOpacity="0.45"
          />

          {/* N Right Chiseled Spine */}
          <line
            x1="226"
            y1="62"
            x2="226"
            y2="274"
            stroke={`url(#${prefix}-chiselSpine)`}
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          {/* N Cyber/Runic Inscriptions in Soft Glowing Lavender */}
          <g stroke="rgba(216, 180, 254, 0.7)" strokeWidth="1.1" strokeLinecap="round" fill="none">
            <path d="M 94 138 L 94 172 M 94 148 L 100 144 M 94 162 L 100 158" />
            <path d="M 94 186 L 94 220 M 88 198 L 94 204 L 100 198" />
            <path d="M 236 138 L 236 172 M 236 148 L 230 154 M 236 158 L 230 164" />
            <path d="M 236 186 L 236 220 M 230 196 L 236 202 L 242 196" />
          </g>

          {/* ------------------------- LETTER X ------------------------- */}
          {/* X Diagonal 1 (Top-Left to Bottom-Right) - Upper Light Facet */}
          <path
            d="M 292 62 L 322 62 L 436 242 L 436 274 L 406 274 L 292 98 Z"
            fill={`url(#${prefix}-frontLavender)`}
            stroke="#8b5cf6"
            strokeWidth="0.65"
            strokeOpacity="0.45"
          />

          {/* X Diagonal 1 - Shadow Facet (Deep Violet) */}
          <path
            d="M 292 62 L 272 98 L 382 274 L 406 274 L 292 62 Z"
            fill={`url(#${prefix}-sideBevelShadow)`}
            stroke="#581c87"
            strokeWidth="0.65"
            strokeOpacity="0.45"
          />

          {/* X Diagonal 1 Spine Line */}
          <line
            x1="306"
            y1="80"
            x2="422"
            y2="258"
            stroke={`url(#${prefix}-chiselSpine)`}
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          {/* X Diagonal 2 (Bottom-Left to Top-Right) - Upper Light Facet */}
          <path
            d="M 436 62 L 406 62 L 292 242 L 292 274 L 322 274 L 436 98 Z"
            fill={`url(#${prefix}-facetSheen)`}
            stroke="#8b5cf6"
            strokeWidth="0.65"
            strokeOpacity="0.45"
          />

          {/* X Diagonal 2 - Shadow Facet */}
          <path
            d="M 436 62 L 458 98 L 348 274 L 322 274 L 436 62 Z"
            fill={`url(#${prefix}-sideBevelShadow)`}
            stroke="#581c87"
            strokeWidth="0.65"
            strokeOpacity="0.45"
          />

          {/* X Diagonal 2 Spine Line */}
          <line
            x1="422"
            y1="80"
            x2="306"
            y2="258"
            stroke={`url(#${prefix}-chiselSpine)`}
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          {/* X Center Nexus Core (Diamond Gem at intersection x:364, y:168) */}
          <polygon
            points="364,146 384,168 364,190 344,168"
            fill="#0b0416"
            stroke="#8b5cf6"
            strokeWidth="1.1"
          />
          <polygon
            points="364,152 378,168 364,184 350,168"
            fill={`url(#${prefix}-frontLavender)`}
            opacity="0.9"
          />
          <circle cx="364" cy="168" r="2.2" fill="#e9d5ff" stroke="#f472b6" strokeWidth="0.6" />

          {/* X Cyber/Runic Inscriptions in Soft Glowing Lavender */}
          <g stroke="rgba(216, 180, 254, 0.7)" strokeWidth="1.1" strokeLinecap="round" fill="none">
            <path d="M 320 102 L 332 118 M 326 106 L 334 112" />
            <path d="M 404 102 L 392 118 M 398 106 L 390 112" />
            <path d="M 334 220 L 322 236 M 328 224 L 320 230" />
            <path d="M 392 220 L 404 236 M 398 224 L 406 230" />
          </g>

          {/* Clean Floating Brand Sub-plate (NUWAYX TECH) - Directly in space, NO FLOOR */}
          <g opacity="0.9">
            {/* Left Accent Diamond in Sakura Pink */}
            <polygon points="144,308 148,312 144,316 140,312" fill="#f472b6" />
            <line x1="152" y1="312" x2="176" y2="312" stroke="#8b5cf6" strokeWidth="1.0" strokeOpacity="0.6" />

            {/* Brand Title Text in Refined Silver-Lavender */}
            <text
              x="260"
              y="316"
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize="13.5"
              fontWeight="600"
              letterSpacing="0.42em"
              style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
            >
              NUWAYX TECH
            </text>

            {/* Right Accent Diamond in Sakura Pink */}
            <line x1="344" y1="312" x2="368" y2="312" stroke="#8b5cf6" strokeWidth="1.0" strokeOpacity="0.6" />
            <polygon points="376,308 380,312 376,316 372,312" fill="#f472b6" />
          </g>
        </g>

        {/* ============================================================== */}
        {/* 2. CHERRY BLOSSOM BLADE SLASH (SECTION 2)                      */}
        {/* Sharp diagonal energy blade crossing through center of NX      */}
        {/* ============================================================== */}
        <g id={`${prefix}-blade-slash-group`}>
          {/* 1. Vivid Rose & Cherry Ambient Glow Layer */}
          <path
            d="M 12 238 Q 260 162, 508 132 Q 260 178, 12 238 Z"
            fill="#f43f5e"
            opacity={slashAnimating ? 0.75 : 0.45}
            filter={`url(#${prefix}-bladeGlow)`}
            className="transition-opacity duration-300"
          />

          {/* 2. Main Razor Blade Polygon in Vivid Cherry Blossom Palette */}
          <path
            d="M 14 238 Q 260 162, 506 132 Q 260 176, 14 238 Z"
            fill={`url(#${prefix}-bladeSakura)`}
            filter="drop-shadow(0 0 3px rgba(225, 29, 72, 0.6))"
          />

          {/* 3. Bright Pink-White Sharp Central Core Edge */}
          <path
            d="M 32 234 Q 260 168, 488 134"
            stroke="#ffe4e6"
            strokeWidth={slashAnimating ? 2.4 : 1.8}
            strokeLinecap="round"
            filter="drop-shadow(0 0 3px #f43f5e) drop-shadow(0 0 7px #e11d48)"
            className="transition-all duration-300"
          />

          {/* 4. Fine Glowing Pink Energy Filaments & Branch Lightning */}
          <g
            className={animate ? 'animate-lightning' : ''}
            stroke="#fecdd3"
            strokeWidth="0.95"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity={slashAnimating ? 0.95 : 0.75}
          >
            {/* Upper energy branch */}
            <path d="M 70 230 L 98 222 L 115 227 L 145 214 L 180 206 L 205 211 L 240 188 L 275 180 L 310 174 L 342 179 L 385 162 L 420 152 L 445 146" />
            {/* Lower energy branch */}
            <path d="M 120 236 L 140 242 L 175 228 L 210 220 L 235 226 L 270 205 L 305 196 L 330 202 L 370 186 L 405 174 L 430 168" />
            {/* Vertical micro-energy connects */}
            <path d="M 185 204 L 182 216 M 275 178 L 278 190 M 365 168 L 362 180" />
          </g>

          {/* 5. Animated Shimmer / Sweep Effect across the blade during activation/idle */}
          {animate && !reducedMotion && (
            <g clipPath={`url(#${prefix}-bladeClip)`}>
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
        </g>

        {/* ============================================================== */}
        {/* 5. BLUE THUNDER CORNER STAR (SECTION 5)                        */}
        {/* Small, sharp blue thunder star at bottom-right of NX           */}
        {/* Located at lower-right dagger apex of 'X' (x:436, y:274)       */}
        {/* ============================================================== */}
        <g
          id={`${prefix}-thunder-star`}
          className={animate ? 'animate-thunder-flicker' : ''}
          style={{ transformOrigin: '436px 274px' }}
        >
          {/* Controlled electric micro-halo */}
          <circle
            cx="436"
            cy="274"
            r="5"
            fill="#00f2fe"
            opacity={slashAnimating ? 0.35 : 0.16}
            className="transition-opacity duration-300"
          />

          {/* Electric Blue Outer Four-Point Star */}
          <path
            d="M 436 264 Q 436 274, 446 274 Q 436 274, 436 284 Q 436 274, 426 274 Q 436 274, 436 264 Z"
            fill="#00f2fe"
            filter="drop-shadow(0 0 2px rgba(0, 242, 254, 0.8))"
          />

          {/* Icy White Inner Four-Point Star */}
          <path
            d="M 436 268 Q 436 274, 442 274 Q 436 274, 436 280 Q 436 274, 430 274 Q 436 274, 436 268 Z"
            fill="#ffffff"
          />

          {/* Fine, Short Electric Sparks */}
          <g stroke="#38bdf8" strokeWidth="0.75" strokeLinecap="round" opacity="0.8">
            <line x1="424" y1="274" x2="448" y2="274" />
            <line x1="436" y1="262" x2="436" y2="286" />
          </g>

          {/* Pure Icy White Center Core */}
          <circle cx="436" cy="274" r="1.1" fill="#ffffff" />
        </g>
      </svg>

      {/* ============================================================== */}
      {/* 3. FOREGROUND CANVAS LAYER                                     */}
      {/* Burst & Floating Sakura Petals + Energy Trail Sparks            */}
      {/* ============================================================== */}
      {animate && renderParticles && !reducedMotion && (
        <NXCinematicCanvas
          layer="foreground"
          triggerKey={internalTriggerKey}
          interactive={interactive}
          isHovered={isHovered}
          reducedMotion={reducedMotion}
          density={density}
          className="z-20 pointer-events-none"
        />
      )}
    </div>
  );
};

export const NuwayXLogo = UAJLogo;
export default UAJLogo;
