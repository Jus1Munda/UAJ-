/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, MapPin, Shield } from 'lucide-react';

interface AboutProps {
  onOpenContact?: () => void;
}

export const About: React.FC<AboutProps> = () => {
  const CONTACT_EMAIL = 'nuwayx.official@gmail.com';
  const LOCATION_SUMMARY = 'Haridwar, Uttarakhand, India';

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto scroll-mt-20 border-t border-slate-900">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#fb7185] block mb-1.5 font-semibold">
            Studio Background
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
          >
            ABOUT NUWAYX TECH
          </h2>
        </div>
        <p className="text-slate-400 max-w-md text-sm mt-3 md:mt-0 leading-relaxed">
          Crafting modern websites, animated digital experiences, and practical web solutions for businesses, creators, and students.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Contact & Studio Inquiries */}
        <div className="p-6 sm:p-8 rounded-2xl bg-obsidian-card border border-[#a855f7]/30 flex flex-col justify-between relative overflow-hidden group shadow-[0_0_40px_rgba(168,85,247,0.1)]">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#140e2b] border border-[#a855f7]/40 flex items-center justify-center text-[#fb7185] mb-5 shadow-[0_0_15px_rgba(244,63,94,0.25)]">
              <Mail className="w-5 h-5" />
            </div>

            <span className="text-xs font-mono uppercase tracking-wider text-[#c084fc] block mb-1 font-semibold">
              Direct Communication
            </span>
            <h3
              className="text-xl sm:text-2xl font-bold text-white mb-3"
              style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
            >
              Studio Contact & Base
            </h3>

            <div className="space-y-3.5 mb-6">
              <div className="flex items-start gap-3 text-xs text-slate-300">
                <Mail className="w-4 h-4 text-[#fb7185] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px] font-mono uppercase">Inquiries & Briefs:</span>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-white hover:text-[#fb7185] font-medium transition-colors cursor-pointer"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-slate-300">
                <MapPin className="w-4 h-4 text-[#c084fc] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px] font-mono uppercase">Studio Base & Location:</span>
                  <span className="text-white font-medium">{LOCATION_SUMMARY}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                <Shield className="w-4 h-4 text-[#fb7185] shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  For Academic & College Services, service feasibility and local delivery availability are confirmed privately following inquiry submission.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
              Direct Contact · NuwayX Tech
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
