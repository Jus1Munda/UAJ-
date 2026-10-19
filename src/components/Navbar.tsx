/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { UAJLogo } from './UAJLogo';
import { ArrowUpRight, Zap } from 'lucide-react';

export type AppPage = 'home' | 'services' | 'approach' | 'portfolio' | 'playground';

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
    <header className="sticky top-0 z-50 w-full bg-[#07050d]/95 backdrop-blur-md border-b border-[#8b5cf6]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Element: UAJ Logo + "UAJ WEB TECH" Text */}
          <button
            onClick={handleReturnHome}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f2fe] rounded-lg p-1 text-left cursor-pointer"
            aria-label="UAJ Web Tech - Return Home"
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
                className="font-bold tracking-wider text-base sm:text-lg text-white group-hover:text-[#00f2fe] transition-colors whitespace-nowrap"
                style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
              >
                UAJ WEB TECH
              </span>
              <span className="text-[10px] tracking-wider text-[#a78bfa] uppercase hidden sm:block -mt-1 font-mono">
                Independent Digital Studio
              </span>
            </div>
          </button>

          {/* Action Area: Start a Project */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onContactClick}
              className="relative inline-flex items-center justify-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs font-bold tracking-wider uppercase text-white bg-[#0e091e] border border-[#00f2fe]/40 rounded-lg hover:border-[#00f2fe] hover:bg-[#16102e] hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all duration-300 whitespace-nowrap cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f2fe]"
              style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
            >
              <Zap className="w-3.5 h-3.5 text-[#00f2fe] group-hover:scale-110 transition-transform" />
              <span>Start a project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors hidden sm:inline" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
