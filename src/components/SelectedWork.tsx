/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layers, ArrowRight, Sparkles, Clock, Zap } from 'lucide-react';

interface SelectedWorkProps {
  onInquireProject: (projectName: string) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onInquireProject }) => {
  return (
    <section id="work" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#00f2fe] block mb-1.5 font-semibold">
            Studio Portfolio
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
          >
            SELECTED WORK
          </h2>
        </div>
        <p className="text-slate-400 max-w-md text-sm mt-3 md:mt-0 leading-relaxed">
          Client projects, bespoke web platforms, and interactive digital solutions.
        </p>
      </div>

      {/* Blank / Coming Soon Placeholder Container */}
      <div className="relative rounded-2xl bg-obsidian-card border border-[#8b5cf6]/30 p-10 sm:p-16 text-center overflow-hidden group shadow-[0_0_50px_rgba(139,92,246,0.1)]">
        {/* Subtle background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none opacity-25"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 242, 254, 0.3) 0%, rgba(139, 92, 246, 0.2) 40%, transparent 70%)',
            filter: 'blur(50px)'
          }}
        />

        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#140e2b] border border-[#8b5cf6]/40 flex items-center justify-center text-[#00f2fe] mb-5 shadow-[0_0_20px_rgba(0,242,254,0.2)]">
            <Clock className="w-7 h-7" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-[#a78bfa] mb-2 font-semibold">
            Curating Client Case Studies
          </span>

          <h3
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
          >
            PORTFOLIO COMING SOON
          </h3>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
            We are currently documenting and preparing our latest client web releases, custom platforms, and design systems.
            Real case studies will be published here shortly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onInquireProject('Private Portfolio Request')}
              className="px-6 py-3 rounded-lg bg-[#00f2fe] hover:bg-[#38bdf8] text-black font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,242,254,0.3)]"
              style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Request Private Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
