/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, AppPage } from './components/Navbar';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
import { Approach } from './components/Approach';
import { SelectedWork } from './components/SelectedWork';
import { InteractiveTester } from './components/InteractiveTester';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ArrowLeft, ArrowRight, Code2, Compass, Layers, Sliders, Zap } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [modalOpen, setModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Website Design & Development');

  // Sync with browser URL hash
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
      if (['home', 'services', 'approach', 'portfolio', 'playground'].includes(hash)) {
        setCurrentPage(hash as AppPage);
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const handlePageChange = (page: AppPage) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenModal = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setModalOpen(true);
  };

  const pageNames: Record<AppPage, string> = {
    home: 'Home',
    services: 'Services & Capabilities',
    approach: 'Studio Approach',
    portfolio: 'Portfolio',
    playground: 'Studio Playground'
  };

  return (
    <div className="min-h-screen bg-[#05040a] text-slate-100 flex flex-col selection:bg-[#00f2fe]/30 selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onContactClick={() => handleOpenModal()}
      />

      {/* Main Page Content - Divided by separate pages with Back to Home Screen */}
      <main className="flex-1">
        {/* ============================================================== */}
        {/* PAGE 1: HOME PAGE                                              */}
        {/* ============================================================== */}
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-300">
            <Hero
              onExploreServices={() => handlePageChange('services')}
              onDiscoverApproach={() => handlePageChange('approach')}
            />

            {/* Quick Page Jump Hub */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
              <div className="text-center mb-8">
                <span className="text-xs font-mono uppercase tracking-wider text-[#00f2fe] block mb-1">
                  Studio Directory
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                >
                  EXPLORE UAJ WEB TECH
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Jump to Services */}
                <button
                  onClick={() => handlePageChange('services')}
                  className="p-5 rounded-xl bg-obsidian-card border border-slate-800 hover:border-[#00f2fe]/60 text-left transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#140e2b] border border-[#8b5cf6]/30 flex items-center justify-center text-[#00f2fe] mb-3 group-hover:scale-105 transition-transform">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-lg font-bold text-white group-hover:text-[#00f2fe] transition-colors"
                    style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                  >
                    Services & Capabilities
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 mb-3">
                    6 bespoke web development and digital design offerings.
                  </p>
                  <span className="text-xs font-mono text-[#00f2fe] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Open Services →
                  </span>
                </button>

                {/* Jump to Approach */}
                <button
                  onClick={() => handlePageChange('approach')}
                  className="p-5 rounded-xl bg-obsidian-card border border-slate-800 hover:border-[#8b5cf6]/60 text-left transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#140e2b] border border-[#8b5cf6]/30 flex items-center justify-center text-[#a78bfa] mb-3 group-hover:scale-105 transition-transform">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-lg font-bold text-white group-hover:text-[#a78bfa] transition-colors"
                    style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                  >
                    Studio Approach
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 mb-3">
                    Our 4-stage process and performance benchmark simulator.
                  </p>
                  <span className="text-xs font-mono text-[#a78bfa] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Open Approach →
                  </span>
                </button>

                {/* Jump to Portfolio */}
                <button
                  onClick={() => handlePageChange('portfolio')}
                  className="p-5 rounded-xl bg-obsidian-card border border-slate-800 hover:border-[#00f2fe]/60 text-left transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#140e2b] border border-[#8b5cf6]/30 flex items-center justify-center text-[#00f2fe] mb-3 group-hover:scale-105 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-lg font-bold text-white group-hover:text-[#00f2fe] transition-colors"
                    style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                  >
                    Selected Work
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 mb-3">
                    Client case studies and private portfolio briefing.
                  </p>
                  <span className="text-xs font-mono text-[#00f2fe] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Open Portfolio →
                  </span>
                </button>

                {/* Jump to Playground */}
                <button
                  onClick={() => handlePageChange('playground')}
                  className="p-5 rounded-xl bg-obsidian-card border border-slate-800 hover:border-[#8b5cf6]/60 text-left transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#140e2b] border border-[#8b5cf6]/30 flex items-center justify-center text-[#a78bfa] mb-3 group-hover:scale-105 transition-transform">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-lg font-bold text-white group-hover:text-[#a78bfa] transition-colors"
                    style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                  >
                    Studio Playground
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 mb-3">
                    Interactive logo tester, scale preview, and glow toggles.
                  </p>
                  <span className="text-xs font-mono text-[#a78bfa] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Test Brandmark →
                  </span>
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ============================================================== */}
        {/* SUB-PAGES (Services, Approach, Portfolio, Playground)          */}
        {/* ============================================================== */}
        {currentPage !== 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* Top Sub-Page Navigation Strip with Proper Back Button */}
            <div className="border-b border-slate-900/80 bg-[#07050d]/60 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                <button
                  onClick={() => handlePageChange('home')}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#140e2b] border border-[#8b5cf6]/40 hover:border-[#00f2fe] text-xs font-semibold text-slate-200 hover:text-white uppercase tracking-wider transition-all cursor-pointer shadow-sm group"
                  style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                  aria-label="Back to Home"
                >
                  <ArrowLeft className="w-4 h-4 text-[#00f2fe] group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Home</span>
                </button>

                <div className="text-xs font-mono text-slate-500 hidden sm:flex items-center gap-2">
                  <span>Home</span>
                  <span>/</span>
                  <span className="text-[#a78bfa]">{pageNames[currentPage]}</span>
                </div>
              </div>
            </div>

            {/* Sub-page Body */}
            {currentPage === 'services' && (
              <Capabilities onSelectService={(service) => handleOpenModal(service)} />
            )}

            {currentPage === 'approach' && (
              <Approach onOpenContact={() => handleOpenModal()} />
            )}

            {currentPage === 'portfolio' && (
              <SelectedWork
                onInquireProject={(projectTitle) =>
                  handleOpenModal(`Custom Build for ${projectTitle}`)
                }
              />
            )}

            {currentPage === 'playground' && (
              <div className="pt-6">
                <InteractiveTester />
              </div>
            )}

            {/* Bottom Action Card on Sub-Pages */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#090714] border border-[#8b5cf6]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_40px_rgba(139,92,246,0.15)]">
                <div>
                  <span className="text-xs font-mono text-[#a78bfa] uppercase tracking-wider block mb-1">
                    Finished Exploring?
                  </span>
                  <h4
                    className="text-xl sm:text-2xl font-bold text-white tracking-tight"
                    style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                  >
                    READY TO BRING YOUR IDEAS TO LIFE?
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleOpenModal()}
                    className="px-6 py-2.5 rounded-lg bg-[#00f2fe] hover:bg-[#38bdf8] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(0,242,254,0.3)]"
                    style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                  >
                    <Zap className="w-3.5 h-3.5 fill-black" />
                    <span>Start a Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onContactClick={() => handleOpenModal()}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Project Inquiry Modal */}
      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService={selectedService}
      />

      {/* Separate Admin Dashboard for managing project inquiries */}
      {adminOpen && <AdminDashboard onClose={() => setAdminOpen(false)} />}
    </div>
  );
}
