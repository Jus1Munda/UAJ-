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
    <footer className="border-t border-slate-900 bg-[#040308] relative z-10 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-900">
          {/* Brand Mark in Footer */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleReturnHome}
              className="h-8 w-auto aspect-[520/340] relative flex items-center justify-center cursor-pointer text-left"
              aria-label="Return to home page"
            >
              <UAJLogo
                className="h-8 w-auto"
                size="navbar"
                showAura={false}
                animate={true}
                idPrefix="footer"
              />
            </button>
            <div>
              <span
                className="font-bold text-lg text-white tracking-wider block"
                style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
              >
                UAJ WEB TECH
              </span>
              <span className="text-xs text-slate-400">
                Independent Digital Studio · Ideas into digital experiences.
              </span>
            </div>
          </div>

          {/* Action Button: Back to Top */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-400 cursor-pointer bg-[#120d24] px-4 py-2 rounded-lg border border-slate-800 hover:border-[#8b5cf6]/40"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#00f2fe]" />
            </button>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex items-center justify-between gap-4 text-xs text-slate-400">
          <div className="font-mono text-[11px] text-slate-400">
            UAJ Web Tech · High Performance Digital Architecture
          </div>
          <div
            className="flex items-center gap-2 text-slate-400 cursor-pointer select-none"
            title="Double-click to open Studio Admin Portal"
            onDoubleClick={onOpenAdmin}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#00f2fe]" />
            <span className="hidden sm:inline">Admin Secured</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
