/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, AppPage } from './components/Navbar';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
import { ServiceVault } from './components/ServiceVault';
import { VaultCategoryKey } from './data/serviceVaultData';
import { Approach } from './components/Approach';
import { SelectedWork } from './components/SelectedWork';
import { InteractiveTester } from './components/InteractiveTester';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { ProjectModal } from './components/ProjectModal';
import { AdminDashboard } from './components/AdminDashboard';
import { CinematicBackground } from './components/CinematicBackground';
import { ArrowLeft, ArrowRight, Code2, Compass, Layers, Sliders, Zap } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [modalOpen, setModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Website Design & Development');
  const [modalBudget, setModalBudget] = useState<string | undefined>(undefined);
  const [modalNotes, setModalNotes] = useState<string | undefined>(undefined);

  // Service Vault catalogue state
  const [selectedVaultCategory, setSelectedVaultCategory] = useState<VaultCategoryKey>('all');
  const [vaultSearchFilter, setVaultSearchFilter] = useState<string>('');

  // Sync with browser URL hash and path
  useEffect(() => {
    const parseRoute = () => {
      const rawHash = window.location.hash.replace('#/', '').replace('#', '');
      const [path, queryString] = rawHash.split('?');
      const normalizedPath = (path || '').toLowerCase();

      const searchParams = new URLSearchParams(queryString || '');
      const catParam = searchParams.get('category');
      const filterParam = searchParams.get('filter');

      if (
        catParam &&
        ['all', 'websites', 'ui-ux', 'presentation', 'branding', 'creator', 'interactive', 'academic', 'packages'].includes(
          catParam
        )
      ) {
        setSelectedVaultCategory(catParam as VaultCategoryKey);
      }
      if (filterParam) {
        setVaultSearchFilter(filterParam);
      }

      if (normalizedPath === 'services/catalogue' || normalizedPath === 'catalogue') {
        setCurrentPage('catalogue');
      } else if (['home', 'services', 'approach', 'portfolio', 'playground'].includes(normalizedPath)) {
        setCurrentPage(normalizedPath as AppPage);
      } else if (window.location.pathname === '/services/catalogue') {
        setCurrentPage('catalogue');
      }
    };

    parseRoute();
    window.addEventListener('hashchange', parseRoute);
    return () => window.removeEventListener('hashchange', parseRoute);
  }, []);

  const handlePageChange = (page: AppPage) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCatalogue = (categoryKey?: string, filter?: string) => {
    const validCat = (categoryKey || 'all') as VaultCategoryKey;
    setSelectedVaultCategory(validCat);
    setVaultSearchFilter(filter || '');
    setCurrentPage('catalogue');

    const query = new URLSearchParams();
    if (categoryKey && categoryKey !== 'all') {
      query.set('category', categoryKey);
    }
    if (filter) {
      query.set('filter', filter);
    }
    const queryStr = query.toString() ? `?${query.toString()}` : '';
    window.location.hash = `#/services/catalogue${queryStr}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVaultCategory = (cat: VaultCategoryKey) => {
    setSelectedVaultCategory(cat);
    const query = new URLSearchParams();
    if (cat !== 'all') {
      query.set('category', cat);
    }
    if (vaultSearchFilter) {
      query.set('filter', vaultSearchFilter);
    }
    const queryStr = query.toString() ? `?${query.toString()}` : '';
    window.location.hash = `#/services/catalogue${queryStr}`;
  };

  const handleOpenModal = (serviceName?: string, budget?: string, notes?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setModalBudget(budget);
    setModalNotes(notes);
    setModalOpen(true);
  };

  const pageNames: Record<AppPage, string> = {
    home: 'Home',
    services: 'Services & Capabilities',
    catalogue: 'The Service Vault',
    approach: 'Studio Approach',
    portfolio: 'Portfolio',
    playground: 'Studio Playground'
  };

  return (
    <div className="min-h-screen bg-[#05040a] text-slate-100 flex flex-col selection:bg-[#a855f7]/30 selection:text-white relative">
      {/* Persistent Cinematic Video Background across all pages on Desktop */}
      <CinematicBackground />

      {/* Sticky Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onContactClick={() => handleOpenModal()}
      />

      {/* Main Page Content */}
      <main className="flex-1 relative z-10">
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
                <span className="text-xs font-mono uppercase tracking-wider text-[#fb7185] block mb-1">
                  Studio Directory
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                >
                  EXPLORE NUWAYX TECH
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Jump to Services */}
                <button
                  onClick={() => handlePageChange('services')}
                  className="p-5 rounded-xl bg-obsidian-card border border-slate-800 hover:border-[#fb7185]/60 text-left transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#140e2b] border border-[#a855f7]/30 flex items-center justify-center text-[#fb7185] mb-3 group-hover:scale-105 transition-transform">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-lg font-bold text-white group-hover:text-[#fb7185] transition-colors"
                    style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                  >
                    Services & Capabilities
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 mb-3">
                    7 bespoke digital offerings, creative services, and student support.
                  </p>
                  <span className="text-xs font-mono text-[#fb7185] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Open Services →
                  </span>
                </button>

                {/* Jump to Approach */}
                <button
                  onClick={() => handlePageChange('approach')}
                  className="p-5 rounded-xl bg-obsidian-card border border-slate-800 hover:border-[#c084fc]/60 text-left transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#140e2b] border border-[#a855f7]/30 flex items-center justify-center text-[#c084fc] mb-3 group-hover:scale-105 transition-transform">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-lg font-bold text-white group-hover:text-[#c084fc] transition-colors"
                    style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                  >
                    Studio Approach
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 mb-3">
                    Our 4-stage process and performance benchmark simulator.
                  </p>
                  <span className="text-xs font-mono text-[#c084fc] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Open Approach →
                  </span>
                </button>

                {/* Jump to Portfolio */}
                <button
                  onClick={() => handlePageChange('portfolio')}
                  className="p-5 rounded-xl bg-obsidian-card border border-slate-800 hover:border-[#fb7185]/60 text-left transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#140e2b] border border-[#a855f7]/30 flex items-center justify-center text-[#fb7185] mb-3 group-hover:scale-105 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-lg font-bold text-white group-hover:text-[#fb7185] transition-colors"
                    style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                  >
                    Selected Work
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 mb-3">
                    Client case studies and private portfolio briefing.
                  </p>
                  <span className="text-xs font-mono text-[#fb7185] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Open Portfolio →
                  </span>
                </button>

                {/* Jump to Playground */}
                <button
                  onClick={() => handlePageChange('playground')}
                  className="p-5 rounded-xl bg-obsidian-card border border-slate-800 hover:border-[#c084fc]/60 text-left transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#140e2b] border border-[#a855f7]/30 flex items-center justify-center text-[#c084fc] mb-3 group-hover:scale-105 transition-transform">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-lg font-bold text-white group-hover:text-[#c084fc] transition-colors"
                    style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                  >
                    Studio Playground
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 mb-3">
                    Interactive logo tester, scale preview, and glow toggles.
                  </p>
                  <span className="text-xs font-mono text-[#c084fc] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Test Brandmark →
                  </span>
                </button>
              </div>
            </section>

            {/* About NuwayX Tech Section (Homepage Only) */}
            <About onOpenContact={() => handleOpenModal()} />
          </div>
        )}

        {/* ============================================================== */}
        {/* SUB-PAGES (Services, Catalogue, Approach, Portfolio, etc.)     */}
        {/* ============================================================== */}
        {currentPage !== 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* Top Sub-Page Navigation Strip with Proper Back Button */}
            <div className="border-b border-slate-900/80 bg-[#07050d]/60 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                <button
                  onClick={() => handlePageChange('home')}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#140e2b] border border-[#a855f7]/40 hover:border-[#fb7185] text-xs font-semibold text-slate-200 hover:text-white uppercase tracking-wider transition-all cursor-pointer shadow-sm group"
                  style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                  aria-label="Back to Home"
                >
                  <ArrowLeft className="w-4 h-4 text-[#fb7185] group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Home</span>
                </button>

                <div className="text-xs font-mono text-slate-500 hidden sm:flex items-center gap-2">
                  <span>Home</span>
                  <span>/</span>
                  <span className="text-[#c084fc]">{pageNames[currentPage]}</span>
                </div>
              </div>
            </div>

            {/* Sub-page Body: Services */}
            {currentPage === 'services' && (
              <Capabilities
                onSelectService={(service) => handleOpenModal(service)}
                onExploreCategory={(catKey, filter) => handleOpenCatalogue(catKey, filter)}
              />
            )}

            {/* Sub-page Body: The Service Vault (Dedicated Catalogue Page) */}
            {currentPage === 'catalogue' && (
              <ServiceVault
                activeCategory={selectedVaultCategory}
                onSelectCategory={handleSelectVaultCategory}
                initialFilter={vaultSearchFilter}
                onBackToServices={() => handlePageChange('services')}
                onDiscussService={(serviceTitle, priceEst, notes) =>
                  handleOpenModal(serviceTitle, priceEst, notes)
                }
              />
            )}

            {/* Sub-page Body: Approach */}
            {currentPage === 'approach' && (
              <Approach onOpenContact={() => handleOpenModal()} />
            )}

            {/* Sub-page Body: Portfolio */}
            {currentPage === 'portfolio' && (
              <SelectedWork
                onInquireProject={(projectTitle) =>
                  handleOpenModal(`Custom Build for ${projectTitle}`)
                }
              />
            )}

            {/* Sub-page Body: Playground */}
            {currentPage === 'playground' && (
              <div className="pt-6">
                <InteractiveTester />
              </div>
            )}

            {/* Bottom Action Card on Sub-Pages (except Catalogue which has its own tailored footer action) */}
            {currentPage !== 'catalogue' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-[#090714] border border-[#a855f7]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
                  <div>
                    <span className="text-xs font-mono text-[#c084fc] uppercase tracking-wider block mb-1">
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
                      className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-lg text-xs font-semibold tracking-[0.14em] uppercase text-slate-100 bg-[#140e2b] hover:bg-[#1d123d] border border-[#a855f7]/40 hover:border-[#fb7185]/75 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.35)] hover:shadow-[0_0_20px_rgba(251,113,133,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fb7185]/80"
                      style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                    >
                      <Zap className="w-3.5 h-3.5 text-[#fb7185] group-hover:scale-110 transition-transform duration-200" />
                      <span className="group-hover:text-white transition-colors">Start a Project</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#fb7185] group-hover:translate-x-1 transition-all duration-200" />
                    </button>
                  </div>
                </div>
              </div>
            )}
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
        initialBudget={modalBudget}
        initialNotes={modalNotes}
      />

      {/* Separate Admin Dashboard for managing project inquiries */}
      {adminOpen && <AdminDashboard onClose={() => setAdminOpen(false)} />}
    </div>
  );
}
