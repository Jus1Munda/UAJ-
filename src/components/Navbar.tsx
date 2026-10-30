/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UAJLogo } from './UAJLogo';
import { ArrowUpRight, Zap } from 'lucide-react';

export type AppPage = 'home' | 'services' | 'catalogue' | 'approach' | 'portfolio' | 'playground';

interface NavbarProps {
  currentPage: AppPage;
  onPageChange: (page: AppPage) => void;
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage: _currentPage,
  onPageChange,
  onContactClick
}) => {
  const handleReturnHome = () => {
    onPageChange('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#07050d]/95 backdrop-blur-md border-b border-[#a855f7]/25 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Element: NuwayX Logo + "NuwayX Tech" Text */}
          <button
            onClick={handleReturnHome}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fb7185] rounded-lg p-1 text-left cursor-pointer"
            aria-label="NuwayX Tech - Return Home"
          >
            {/* Logo scaled cleanly to h-9 w-auto */}
            <div className="h-9 w-auto aspect-[520/340] shrink-0 relative flex items-center justify-center">
              <UAJLogo
                className="h-9 w-auto"
                size="navbar"
                showAura={true}
                animate={true}
                idPrefix="nav"
              />
            </div>

            {/* Wordmark text with studio identity */}
            <div className="flex flex-col">
              <span
                className="font-bold tracking-wider text-base sm:text-lg text-white group-hover:text-[#f472b6] transition-colors whitespace-nowrap"
                style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
              >
                NuwayX Tech
              </span>
              <span className="text-[10px] tracking-wider text-[#c084fc] uppercase hidden sm:block -mt-1 font-mono">
                Independent Digital Studio
              </span>
            </div>
          </button>

          {/* Action Area: Start a Project */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onContactClick}
              className="group relative inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2 rounded-lg text-xs font-semibold tracking-[0.14em] uppercase text-slate-100 bg-[#0e091e]/90 hover:bg-[#170e2c] border border-[#a855f7]/40 hover:border-[#fb7185]/75 active:scale-[0.98] transition-all duration-200 whitespace-nowrap cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.35)] hover:shadow-[0_0_20px_rgba(251,113,133,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fb7185]/80"
              style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
            >
              <Zap className="w-3.5 h-3.5 text-[#fb7185] group-hover:scale-110 transition-transform duration-200" />
              <span className="group-hover:text-white transition-colors">Start a project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#fb7185] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 hidden sm:inline" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
