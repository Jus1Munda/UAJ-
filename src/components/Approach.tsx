/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { formatSystemRank } from '../utils/brandTheme';
import { CheckCircle2, Zap, Search, PenTool, Code, CheckCheck } from 'lucide-react';

interface ApproachProps {
  onOpenContact: () => void;
}

export const Approach: React.FC<ApproachProps> = ({ onOpenContact }) => {
  const [activeTier, setActiveTier] = useState<number>(95);
  const currentRank = formatSystemRank(activeTier);

  const speedPresets = [
    { label: 'Standard', value: 72 },
    { label: 'Fast', value: 82 },
    { label: 'S-Rank', value: 90 },
    { label: 'Elite', value: 98 }
  ];

  const steps = [
    {
      step: '01',
      title: 'Discover',
      short: 'Understand goals',
      desc: 'We clarify your core business goals, target audience, brand aesthetic, and technical constraints before writing a single line of code.',
      icon: Search,
      deliverables: 'Project roadmap · Feature scope · Visual moodboard'
    },
    {
      step: '02',
      title: 'Design',
      short: 'Establish direction',
      desc: 'We shape the visual identity, dark-premium aesthetic, custom SVG assets, typography system, and intuitive interaction flows.',
      icon: PenTool,
      deliverables: 'Design system · High-fidelity prototypes · Responsive layouts'
    },
    {
      step: '03',
      title: 'Develop',
      short: 'Build the solution',
      desc: 'We engineer the application using clean TypeScript, React, responsive CSS, and high-performance serverless cloud infrastructure.',
      icon: Code,
      deliverables: 'Component architecture · Fast APIs · Sub-second load speed'
    },
    {
      step: '04',
      title: 'Deliver',
      short: 'Test & launch',
      desc: 'We run end-to-end device testing, performance audits, accessibility checks, and deploy to worldwide edge networks with zero downtime.',
      icon: CheckCheck,
      deliverables: 'Quality assurance · Production release · Ongoing support'
    }
  ];

  return (
    <section id="approach" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#8b5cf6] block mb-1.5 font-semibold">
            Studio Process
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
          >
            HOW WE BRING IDEAS TO LIFE
          </h2>
        </div>
        <p className="text-slate-400 max-w-md text-sm mt-3 md:mt-0 leading-relaxed">
          A visual, structured 4-stage process turning ambitious concepts into polished, production-grade digital experiences.
        </p>
      </div>

      {/* 4 Stage Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        {steps.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.step}
              className="p-6 rounded-xl bg-obsidian-card border border-slate-800/90 hover:border-[#8b5cf6]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-2xl font-extrabold text-[#00f2fe]/80 group-hover:text-[#00f2fe] transition-colors"
                    style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                  >
                    {item.step}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-[#140f28] border border-[#8b5cf6]/30 flex items-center justify-center text-[#a78bfa] group-hover:text-[#00f2fe] transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3
                  className="text-xl font-bold text-white mb-1"
                  style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                >
                  {item.title}
                </h3>
                <span className="text-[11px] font-mono text-[#a78bfa] uppercase tracking-wider block mb-3">
                  {item.short}
                </span>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                <span className="text-[#38bdf8] font-semibold block mb-0.5">Outputs:</span>
                <span>{item.deliverables}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance & Quality Benchmark Bar */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#090714] border border-[#8b5cf6]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[#00f2fe] block mb-1">
            Studio Performance Standards
          </span>
          <h3
            className="text-2xl font-bold text-white mb-3"
            style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
          >
            PRECISION AT EVERY LAYER
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
            We don't just build pages that look good. We test for sub-second speeds, zero layout shifts,
            and airtight security so your product shines on every device.
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00f2fe] shrink-0" />
              <span>Mobile-first testing on modern iOS & Android viewports</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00f2fe] shrink-0" />
              <span>Automated builds & regression testing on each release</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 p-5 rounded-xl bg-[#0e091e] border border-slate-800">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
            <span className="font-semibold text-slate-400">BENCHMARK SIMULATION:</span>
            <span className="font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentRank.color }} />
              <span>{currentRank.rank} ({currentRank.badge})</span>
            </span>
          </div>

          <div className="mb-3">
            <input
              type="range"
              min="70"
              max="99"
              value={activeTier}
              onChange={(e) => setActiveTier(Number(e.target.value))}
              className="w-full accent-[#00f2fe] bg-slate-800 h-2 rounded cursor-pointer"
              aria-label="Speed tier slider"
            />
          </div>

          <div className="flex items-center justify-between gap-1.5 pt-1 mb-4">
            {speedPresets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setActiveTier(preset.value)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                  activeTier === preset.value
                    ? 'bg-[#00f2fe] text-black font-bold'
                    : 'bg-[#18112e] text-slate-300 hover:text-white hover:bg-[#231842]'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span className="text-[11px] text-slate-400 font-mono">
              Output: <strong className="text-[#38bdf8]">{currentRank.desc}</strong>
            </span>
            <button
              onClick={onOpenContact}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-[#00f2fe] hover:bg-[#38bdf8] transition-all flex items-center gap-1.5 cursor-pointer"
              style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
            >
              <Zap className="w-3.5 h-3.5 fill-black" />
              <span>Discuss Your Project</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
