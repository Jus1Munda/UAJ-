/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { formatSystemRank } from '../utils/brandTheme';
import { CheckCircle2, Zap } from 'lucide-react';

interface ArchitectureProps {
  onOpenContact: () => void;
}

export const Architecture: React.FC<ArchitectureProps> = ({ onOpenContact }) => {
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
      step: 'STEP 01',
      title: 'Worldwide Fast Content Delivery (CDN)',
      desc: 'We store your website files on edge servers near your visitors, so pages open in milliseconds anywhere in the world.',
      tools: 'Cloudflare · Edge Caching · Global DNS'
    },
    {
      step: 'STEP 02',
      title: 'Scalable Cloud Servers',
      desc: 'Our servers automatically handle traffic spikes from marketing campaigns or viral launches without slowing down.',
      tools: 'Node.js · Auto-Scaling · Health Monitoring'
    },
    {
      step: 'STEP 03',
      title: 'Secure Databases & Storage',
      desc: 'Your customer data and content are saved with encryption and automatic daily backups so nothing is ever lost.',
      tools: 'PostgreSQL · Redis Cache · Automated Backups'
    }
  ];

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl mx-auto scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Information */}
        <div className="lg:col-span-5">
          <span className="text-xs font-mono uppercase tracking-wider text-[#8b5cf6] block mb-2 font-semibold">
            02. How It Works
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
          >
            HOW WE BUILD <br />
            <span className="text-[#00f2fe]">FAST & RELIABLE APPS</span>
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            We use a modern 3-layer architecture. Whether you have 10 visitors or 100,000 visitors,
            your site stays snappy, responsive, and secure.
          </p>

          {/* Interactive Speed Level Simulator */}
          <div className="p-4 rounded-xl bg-[#0d091e] border border-[#8b5cf6]/30 mb-6">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
              <span className="font-semibold text-slate-400">TARGET SPEED TIER:</span>
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

            {/* Quick preset buttons */}
            <div className="flex items-center justify-between gap-1.5 pt-1">
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

            <div className="mt-2.5 text-[11px] text-slate-400 font-mono">
              Result: <span className="text-[#38bdf8] font-semibold">{currentRank.desc}</span>
            </div>
          </div>

          {/* Simple bullet points */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#00f2fe] shrink-0" />
              <span>Full automated performance and security checks</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#00f2fe] shrink-0" />
              <span>Encrypted user accounts and secure logins</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#00f2fe] shrink-0" />
              <span>Automatic rollback if any issue is detected</span>
            </div>
          </div>

          <button
            onClick={onOpenContact}
            className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#140e2b] border border-[#00f2fe]/50 hover:bg-[#1f1542] hover:border-[#00f2fe] transition-all flex items-center gap-2 cursor-pointer"
            style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
          >
            <Zap className="w-3.5 h-3.5 text-[#00f2fe]" />
            <span>Discuss Your Tech Stack</span>
          </button>
        </div>

        {/* Right 3 Step Cards */}
        <div className="lg:col-span-7 space-y-4">
          {steps.map((layer) => (
            <div
              key={layer.step}
              className="p-5 sm:p-6 rounded-xl bg-obsidian-card border border-slate-800/80 hover:border-[#8b5cf6]/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span className="text-[#00f2fe] font-bold">{layer.step}</span>
                <span className="text-slate-500">INFRASTRUCTURE</span>
              </div>
              <h3
                className="text-lg sm:text-xl font-bold text-white mb-2"
                style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
              >
                {layer.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">{layer.desc}</p>
              <div className="text-xs font-mono text-[#a78bfa] bg-[#140e2b] px-3 py-1 rounded inline-block border border-[#8b5cf6]/20">
                {layer.tools}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
