/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { UAJLogo } from './UAJLogo';
import { HeroCinematicCanvas } from './HeroCinematicCanvas';
import { ChevronRight, Zap, Compass } from 'lucide-react';

interface HeroProps {
  onExploreServices: () => void;
  onDiscoverApproach: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreServices, onDiscoverApproach }) => {
  const [slashTriggerKey, setSlashTriggerKey] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  const triggerSlash = () => {
    setSlashTriggerKey((prev) => prev + 1);
  };

  return (
    <section
      ref={heroSectionRef}
      style={{ touchAction: 'pan-y' }}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-6 sm:pt-8 pb-16 px-4 sm:px-6 lg:px-8"
    >
      {/* ============================================================== */}
      {/* LAYER 1: AMBIENT ATMOSPHERE & CINEMATIC DEPTH                   */}
      {/* (Website video is fixed at inset-0 z-0 in CinematicBackground) */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-transparent transition-colors duration-500">
        {/* Ambient Center Depth */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[350px] rounded-full pointer-events-none opacity-[0.05] transition-opacity duration-700"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.06) 0%, rgba(46, 16, 101, 0.02) 50%, transparent 75%)',
            filter: 'blur(50px)'
          }}
        />

        {/* Diagonal Light Streak */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[120vw] h-[1px] -rotate-12 pointer-events-none opacity-20"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(244, 63, 94, 0.45) 50%, transparent 100%)'
          }}
        />

        {/* Subtle Geometric Obsidian Grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(168, 85, 247, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      {/* ============================================================== */}
      {/* LAYERS 2 & 3: FULL-HERO UNCLIPPED ANIMATION LAYER              */}
      {/* Translucent energy ribbons + cherry blossom particles drifting  */}
      {/* across the entire hero viewport without any rectangular borders*/}
      {/* ============================================================== */}
      <HeroCinematicCanvas
        heroRef={heroSectionRef}
        logoRef={logoRef}
        triggerKey={slashTriggerKey}
        reducedMotion={reducedMotion}
        onSlashTriggered={triggerSlash}
        className="z-[5]"
      />

      {/* ============================================================== */}
      {/* LAYERS 4 & 5: HERO LOGO, TEXT, CTA BUTTONS & PILLARS           */}
      {/* ============================================================== */}
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center relative z-20">
        {/* Studio Identity Label */}
        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#0c0819]/75 hover:bg-[#120a24]/90 border border-[#a855f7]/30 hover:border-[#c084fc]/50 backdrop-blur-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_15px_rgba(168,85,247,0.12)] mb-3 sm:mb-4 group/badge select-none">
          {/* Restrained Sakura-pink micro-accent */}
          <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f43f5e] opacity-40" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#fb7185] shadow-[0_0_8px_rgba(251,113,133,0.8)]" />
          </span>

          {/* Elegant uppercase micro-typography */}
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium text-[#e9d5ff]/90 leading-none">
            INDEPENDENT DIGITAL STUDIO
          </span>

          {/* Subtle separator */}
          <span className="text-[#a855f7]/40 text-[10px] font-mono leading-none">/</span>

          {/* NuwayX Tech with clear secondary emphasis */}
          <span
            className="text-[11px] sm:text-xs font-semibold tracking-wider text-slate-200 group-hover/badge:text-white transition-colors leading-none"
            style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
          >
            NuwayX Tech
          </span>
        </div>

        {/* ============================================================== */}
        {/* LAYER 4: 3D METALLIC NX MONOGRAM & BLADE SLASH                 */}
        {/* Transparent vector lettermark, click/hover interactive         */}
        {/* ============================================================== */}
        <div
          ref={logoRef}
          className="relative my-3 sm:my-5 group cursor-pointer"
          onClick={triggerSlash}
          title="Click to trigger slash effect"
        >
          {/* Hero Logo Container — Seamlessly integrated, zero rectangular clipping */}
          <div className="w-[300px] sm:w-[440px] md:w-[520px] lg:w-[580px] aspect-[520/340] mx-auto relative flex items-center justify-center">
            <UAJLogo
              triggerKey={slashTriggerKey}
              size="hero"
              renderParticles={false}
              showAura={false}
              animate={true}
              interactive={true}
              idPrefix="hero"
              className="w-full h-full relative z-10"
            />
          </div>
        </div>

        {/* ============================================================== */}
        {/* LAYER 5: READABLE HERO TYPOGRAPHY & BUTTONS                    */}
        {/* ============================================================== */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mt-4 mb-5 text-balance leading-tight"
          style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
        >
          Ideas into <br />
          <span className="bg-gradient-to-r from-white via-[#f472b6] to-[#c084fc] bg-clip-text text-transparent">
            digital experiences.
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl text-balance mb-8 font-normal leading-relaxed">
          We create modern websites, impactful presentations and intelligent digital solutions for ambitious ideas.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          {/* Primary CTA */}
          <button
            onClick={onExploreServices}
            className="px-7 py-3.5 rounded-lg text-sm sm:text-base font-bold tracking-wider uppercase text-white bg-gradient-to-r from-[#f43f5e] via-[#e11d48] to-[#9333ea] hover:from-[#fb7185] hover:to-[#a855f7] hover:shadow-[0_0_25px_rgba(244,63,94,0.45)] transition-all duration-300 flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white border border-[#fb7185]/40"
            style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
          >
            <Zap className="w-4 h-4 fill-white text-white" />
            <span>Explore our services</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onDiscoverApproach}
            className="px-6 py-3.5 rounded-lg text-sm sm:text-base font-semibold tracking-wider uppercase text-white bg-[#120d24] border border-[#a855f7]/40 hover:border-[#fb7185] hover:bg-[#1a1334] transition-all duration-300 flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fb7185]"
            style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
          >
            <Compass className="w-4 h-4 text-[#c084fc]" />
            <span>Discover our approach</span>
          </button>
        </div>

        {/* Studio Pillars */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-slate-800/80 w-full max-w-2xl text-center">
          <div>
            <div
              className="text-2xl sm:text-3xl font-bold text-white tabular-nums"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              100%
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Custom Built</div>
          </div>

          <div>
            <div
              className="text-2xl sm:text-3xl font-bold text-[#fb7185] tabular-nums"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Direct
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Studio Collaboration</div>
          </div>

          <div>
            <div
              className="text-2xl sm:text-3xl font-bold text-[#c084fc] tabular-nums"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Modern
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Interactive Web</div>
          </div>
        </div>
      </div>
    </section>
  );
};
