/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UAJLogo } from './UAJLogo';
import { ChevronRight, Flame, Zap, Compass, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreServices: () => void;
  onDiscoverApproach: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreServices, onDiscoverApproach }) => {
  const [manaSurge, setManaSurge] = useState(false);
  const [slashTriggerKey, setSlashTriggerKey] = useState(0);

  const triggerSlash = () => {
    setSlashTriggerKey((prev) => prev + 1);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-10 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background Ambience: Deep obsidian abyss with violet mana glow */}
      <div className="absolute inset-0 -z-20 bg-[#05040a]">
        {/* Soft Violet Center Glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[500px] rounded-full pointer-events-none opacity-40 transition-opacity duration-700"
          style={{
            background: manaSurge
              ? 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.45) 0%, rgba(59, 7, 100, 0.25) 50%, transparent 75%)'
              : 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.3) 0%, rgba(46, 16, 101, 0.18) 50%, transparent 75%)',
            filter: 'blur(70px)'
          }}
        />

        {/* Diagonal Cyan Light Streak */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[120vw] h-[1px] -rotate-12 pointer-events-none opacity-20"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(0, 242, 254, 0.6) 50%, transparent 100%)'
          }}
        />

        {/* Subtle Geometric Obsidian Grid */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        {/* Studio Identity Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#160f2e]/90 border border-[#8b5cf6]/30 text-xs sm:text-sm text-slate-300 mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
          <span className="font-mono text-[#38bdf8] uppercase tracking-wider text-[11px] font-semibold">
            INDEPENDENT DIGITAL STUDIO
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300">UAJ WEB TECH</span>
        </div>

        {/* ============================================================== */}
        {/* CINEMATIC HERO LOGO ELEMENT                                    */}
        {/* ============================================================== */}
        <div
          className="relative my-3 sm:my-5 group cursor-pointer"
          onClick={triggerSlash}
          title="Click to trigger slash effect"
        >
          {/* Overdrive Aura */}
          <div
            className={`absolute -inset-10 sm:-inset-16 rounded-full pointer-events-none transition-all duration-700 ${
              manaSurge
                ? 'opacity-85 blur-3xl scale-110 bg-[#8b5cf6]/35'
                : 'opacity-50 blur-2xl scale-100 bg-[#7c3aed]/25'
            }`}
          />

          {/* Hero Logo Container */}
          <div className="w-[300px] sm:w-[440px] md:w-[520px] lg:w-[580px] aspect-[520/340] mx-auto relative flex items-center justify-center">
            <UAJLogo
              key={slashTriggerKey}
              size="hero"
              showAura={true}
              animate={true}
              interactive={true}
              idPrefix="hero"
              className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
            />
          </div>

          <div className="mt-2 text-[11px] font-mono tracking-wider text-[#a78bfa] uppercase flex items-center justify-center gap-1.5">
            <span>[ Click or Hover to Ignite Blade Slash ]</span>
          </div>
        </div>

        {/* Approved Headline: Ideas into digital experiences. */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mt-4 mb-5 text-balance leading-tight"
          style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
        >
          Ideas into <br />
          <span className="bg-gradient-to-r from-white via-[#00f2fe] to-[#8b5cf6] bg-clip-text text-transparent">
            digital experiences.
          </span>
        </h1>

        {/* Approved Supporting Copy */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl text-balance mb-8 font-normal leading-relaxed">
          We create modern websites, impactful presentations and intelligent digital solutions for ambitious ideas.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          {/* Primary CTA: Explore our services */}
          <button
            onClick={onExploreServices}
            className="px-7 py-3.5 rounded-lg text-sm sm:text-base font-bold tracking-wider uppercase text-black bg-[#00f2fe] hover:bg-[#38bdf8] hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all duration-300 flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
          >
            <Zap className="w-4 h-4 fill-black" />
            <span>Explore our services</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Secondary CTA: Discover our approach */}
          <button
            onClick={onDiscoverApproach}
            className="px-6 py-3.5 rounded-lg text-sm sm:text-base font-semibold tracking-wider uppercase text-white bg-[#120d24] border border-[#8b5cf6]/40 hover:border-[#00f2fe] hover:bg-[#1a1334] transition-all duration-300 flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f2fe]"
            style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
          >
            <Compass className="w-4 h-4 text-[#a78bfa]" />
            <span>Discover our approach</span>
          </button>

          {/* Aura Overdrive Toggle */}
          <button
            onClick={() => setManaSurge(!manaSurge)}
            className={`px-4 py-3.5 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
              manaSurge
                ? 'bg-[#8b5cf6]/30 border-[#8b5cf6] text-[#c4b5fd] shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                : 'bg-[#0f0b1e] border-slate-700 text-slate-300 hover:border-[#8b5cf6] hover:text-white'
            }`}
            style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
            title="Toggle extra glow on the logo"
          >
            <Flame className={`w-4 h-4 ${manaSurge ? 'text-[#00f2fe] animate-bounce' : 'text-[#8b5cf6]'}`} />
            <span>{manaSurge ? 'Glow: High' : 'Boost Glow'}</span>
          </button>
        </div>

        {/* Studio Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-800/80 w-full max-w-3xl text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
              100%
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Custom Built</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#00f2fe] tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
              &lt; 1s
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Load Speed</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
              Direct
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Studio Collaboration</div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#a78bfa] tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
              Modern
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Interactive Web</div>
          </div>
        </div>
      </div>
    </section>
  );
};
