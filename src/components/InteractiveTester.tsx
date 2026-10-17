/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UAJLogo } from './UAJLogo';
import { Sliders, Smartphone, Monitor, Sparkles, RefreshCw, Eye, Check } from 'lucide-react';

export const InteractiveTester: React.FC = () => {
  const [activeSize, setActiveSize] = useState<'navbar' | 'hero' | 'mobile'>('navbar');
  const [animateSlash, setAnimateSlash] = useState(true);
  const [animateAura, setAnimateAura] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [simulatedMobileMenu, setSimulatedMobileMenu] = useState(false);

  const replayAnimation = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <section id="logo-tester" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl mx-auto scroll-mt-20">
      <div className="p-6 sm:p-9 rounded-2xl bg-[#090714] border border-[#8b5cf6]/30 shadow-[0_0_50px_rgba(139,92,246,0.12)]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f2fe] uppercase tracking-wider mb-1 font-semibold">
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Logo Playground</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white"
              style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
            >
              TEST THE LOGO & ANIMATIONS
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Click the options below to see how the logo responds in different sizes and animation modes.
            </p>
          </div>

          {/* Size Mode Switcher Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#130d28] rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveSize('navbar')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeSize === 'navbar'
                  ? 'bg-[#00f2fe] text-black font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Navbar (h-9)</span>
            </button>

            <button
              onClick={() => setActiveSize('hero')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeSize === 'hero'
                  ? 'bg-[#00f2fe] text-black font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hero Scale</span>
            </button>

            <button
              onClick={() => setActiveSize('mobile')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeSize === 'mobile'
                  ? 'bg-[#00f2fe] text-black font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Header</span>
            </button>
          </div>
        </div>

        {/* Animation Control Bar: All Workable Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button
            onClick={replayAnimation}
            className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#160f2d] border border-[#00f2fe]/40 text-[#00f2fe] hover:bg-[#201540] hover:border-[#00f2fe] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Replay Blade Slash</span>
          </button>

          <button
            onClick={() => setAnimateAura(!animateAura)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all flex items-center gap-1.5 cursor-pointer ${
              animateAura
                ? 'bg-[#8b5cf6]/20 border-[#8b5cf6] text-[#c4b5fd]'
                : 'bg-[#120e24] border-slate-800 text-slate-400'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Purple Glow: {animateAura ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setAnimateSlash(!animateSlash)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all flex items-center gap-1.5 cursor-pointer ${
              animateSlash
                ? 'bg-[#00f2fe]/20 border-[#00f2fe] text-[#7dd3fc]'
                : 'bg-[#120e24] border-slate-800 text-slate-400'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Blade Animation: {animateSlash ? 'ACTIVE' : 'STATIC'}</span>
          </button>
        </div>

        {/* Live Stage Display */}
        <div className="relative min-h-[280px] flex items-center justify-center p-6 sm:p-8 rounded-xl bg-[#040308] border border-slate-900 overflow-hidden mb-6">
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* VIEWPORT MODE 1: NAVBAR SCALING */}
          {activeSize === 'navbar' && (
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="text-xs font-mono text-slate-400">
                Navbar Placement Spec: <span className="text-[#00f2fe]">h-9 w-auto (36px height)</span>
              </div>
              <div className="px-6 py-3 rounded-lg bg-[#0e091e] border border-[#8b5cf6]/30 flex items-center gap-3 shadow-lg">
                <div className="h-9 w-auto aspect-[520/340] relative flex items-center justify-center">
                  <UAJLogo
                    key={`test-nav-${refreshKey}`}
                    className="h-9 w-auto"
                    size="navbar"
                    animate={animateSlash}
                    showAura={animateAura}
                    idPrefix="test-nav"
                  />
                </div>
                <span
                  className="text-lg font-bold tracking-wider text-white"
                  style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                >
                  UAJ WEB TECH
                </span>
              </div>
              <div className="text-xs text-slate-400 max-w-sm mt-1">
                Sharp dagger edges and electric blade slash stay crisp at small sizes.
              </div>
            </div>
          )}

          {/* VIEWPORT MODE 2: HERO SCALING */}
          {activeSize === 'hero' && (
            <div className="flex flex-col items-center gap-3">
              <div className="w-[280px] sm:w-[400px] aspect-[520/340]">
                <UAJLogo
                  key={`test-hero-${refreshKey}`}
                  className="w-full h-full"
                  size="hero"
                  animate={animateSlash}
                  showAura={animateAura}
                  idPrefix="test-hero"
                />
              </div>
              <div className="text-xs font-mono text-slate-400 text-center">
                Hero Spec: 3D chiseled facets, runes, electric cyan slash, and crimson star spark.
              </div>
            </div>
          )}

          {/* VIEWPORT MODE 3: MOBILE HEADER SIMULATION */}
          {activeSize === 'mobile' && (
            <div className="w-full max-w-sm border border-slate-700/80 rounded-2xl p-4 bg-[#080612] shadow-2xl">
              <div className="text-[11px] font-mono text-slate-400 mb-2 flex items-center justify-between">
                <span>SIMULATED PHONE VIEW</span>
                <span className="text-[#00f2fe]">px-4 PADDING</span>
              </div>

              {/* Mobile Bar Container */}
              <div className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-[#0c0919] border border-[#8b5cf6]/30">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-auto aspect-[520/340] relative flex items-center justify-center">
                    <UAJLogo
                      key={`test-mob-${refreshKey}`}
                      className="h-9 w-auto"
                      size="navbar"
                      animate={animateSlash}
                      showAura={animateAura}
                      idPrefix="test-mob"
                    />
                  </div>
                  <span
                    className="font-bold text-sm tracking-wide text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    UAJ WEB TECH
                  </span>
                </div>

                {/* Interactive Mobile Hamburger Button inside tester */}
                <button
                  onClick={() => setSimulatedMobileMenu(!simulatedMobileMenu)}
                  className="p-1.5 rounded-md bg-[#18112e] border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
                  title="Click to toggle simulated menu"
                >
                  <div className="w-4 h-0.5 bg-slate-300 mb-1" />
                  <div className="w-4 h-0.5 bg-slate-300 mb-1" />
                  <div className="w-3 h-0.5 bg-[#00f2fe]" />
                </button>
              </div>

              {/* Simulated Dropdown */}
              {simulatedMobileMenu && (
                <div className="mt-2 p-2.5 rounded-lg bg-[#110c26] border border-slate-800 text-xs space-y-1.5 animate-in fade-in">
                  <div className="text-slate-300 py-1 px-2 hover:bg-[#1a1238] rounded">Services</div>
                  <div className="text-slate-300 py-1 px-2 hover:bg-[#1a1238] rounded">How We Build</div>
                  <div className="text-[#00f2fe] py-1 px-2 font-semibold">Start a Project →</div>
                </div>
              )}

              <p className="text-[11px] text-slate-400 mt-2.5 text-center">
                Click the menu icon above to test the mobile toggle reaction.
              </p>
            </div>
          )}
        </div>

        {/* Feature Checkpoints */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-slate-800">
          <div className="flex items-start gap-2.5 text-xs text-slate-300">
            <div className="w-4 h-4 rounded-full bg-[#00f2fe]/10 border border-[#00f2fe]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#00f2fe]">
              <Check className="w-2.5 h-2.5" />
            </div>
            <div>
              <span className="font-semibold text-white block">Blade Slash Sweep</span>
              Glides smoothly across UAJ letters on load and hover.
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-slate-300">
            <div className="w-4 h-4 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#8b5cf6]">
              <Check className="w-2.5 h-2.5" />
            </div>
            <div>
              <span className="font-semibold text-white block">Purple Mana Glow</span>
              Gentle breathing pulse behind the logo.
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-slate-300">
            <div className="w-4 h-4 rounded-full bg-[#ff1744]/10 border border-[#ff1744]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#ff1744]">
              <Check className="w-2.5 h-2.5" />
            </div>
            <div>
              <span className="font-semibold text-white block">Red Star Spark</span>
              Subtle glowing sparkle at the bottom-right corner.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
