/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UAJLogo } from './UAJLogo';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { AppPage } from './Navbar';

interface FooterProps {
  currentPage: AppPage;
  onPageChange: (page: AppPage) => void;
  onContactClick: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentPage: _currentPage,
  onPageChange,
  onOpenAdmin
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnHome = () => {
    onPageChange('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#a855f7]/15 bg-[#05030b]/80 backdrop-blur-md relative z-10 py-5 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row: Balanced alignment and cohesive studio presentation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-3 border-b border-slate-800/60">
          {/* Brand Mark, Name & Studio Tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4">
            <button
              onClick={handleReturnHome}
              className="group inline-flex items-center gap-3 text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#fb7185] rounded-lg transition-opacity hover:opacity-95 shrink-0"
              aria-label="NuwayX Tech - Return to home page"
            >
              <div className="h-7 sm:h-8 w-auto aspect-[520/340] relative flex items-center justify-center shrink-0">
                <UAJLogo
                  className="h-7 sm:h-8 w-auto"
                  size="navbar"
                  showAura={false}
                  animate={true}
                  idPrefix="footer"
                />
              </div>
              <span
                className="font-bold text-base sm:text-lg text-white tracking-[0.03em] group-hover:text-[#f472b6] transition-colors leading-none"
                style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
              >
                NuwayX Tech
              </span>
            </button>

            {/* Subtle Studio Tagline Separator & Statement */}
            <div className="hidden sm:block h-3 w-px bg-gradient-to-b from-transparent via-[#a855f7]/30 to-transparent" />

            <p className="text-[11px] sm:text-xs text-slate-400 font-normal tracking-wide leading-normal">
              <span className="text-slate-300 font-medium">Independent Digital Studio</span>
              <span className="text-[#a855f7]/50 mx-2">·</span>
              <span className="text-slate-400">Ideas into digital experiences.</span>
            </p>
          </div>

          {/* Action Button: Redesigned Premium Minimal Back to Top */}
          <div className="flex items-center sm:self-center self-start shrink-0">
            <button
              onClick={scrollToTop}
              className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] text-slate-300 bg-[#0e091e]/80 hover:bg-[#180f2d] hover:text-white border border-[#a855f7]/30 hover:border-[#fb7185]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fb7185]/70 active:scale-[0.98] transition-all duration-200 cursor-pointer backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(251,113,133,0.15)]"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#1b1235] border border-[#a855f7]/30 group-hover:border-[#fb7185]/50 group-hover:bg-[#251336] transition-colors">
                <ArrowUp className="w-2.5 h-2.5 text-[#fb7185] group-hover:-translate-y-0.5 transition-transform duration-200" />
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Strip: Technical Brand Signature & Admin Secured */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 text-[10px] sm:text-[11px]">
          <div className="flex items-center gap-2 font-mono text-slate-400">
            <span className="text-slate-300 font-semibold tracking-wider">NuwayX Tech</span>
            <span className="text-[#a855f7]/40">·</span>
            <span className="uppercase tracking-[0.16em] text-[#c084fc]/85 font-medium">
              High Performance Digital Architecture
            </span>
          </div>
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#a855f7]/20 bg-[#120a24]/40 hover:bg-[#190f30]/60 hover:border-[#a855f7]/40 text-slate-400 hover:text-slate-200 cursor-pointer select-none transition-all group/admin self-start sm:self-auto"
            title="Double-click to open Studio Admin Portal"
            onDoubleClick={onOpenAdmin}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#c084fc] group-hover/admin:text-[#fb7185] transition-colors" />
            <span className="font-mono uppercase tracking-[0.12em] text-[10px]">Admin Secured</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
