/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  VaultCategoryKey,
  VAULT_CATEGORIES,
  VAULT_SERVICES,
  POPULAR_PACKAGES,
  VaultService,
  PopularPackage
} from '../data/serviceVaultData';
import {
  Search,
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Info,
  Shield,
  Layers,
  GraduationCap,
  Package,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';

interface ServiceVaultProps {
  activeCategory: VaultCategoryKey;
  onSelectCategory: (category: VaultCategoryKey) => void;
  initialFilter?: string;
  onBackToServices: () => void;
  onDiscussService: (serviceTitle: string, priceEstimate?: string, notes?: string) => void;
}

export const ServiceVault: React.FC<ServiceVaultProps> = ({
  activeCategory,
  onSelectCategory,
  initialFilter = '',
  onBackToServices,
  onDiscussService
}) => {
  const [searchQuery, setSearchQuery] = useState(initialFilter);

  // Filtered services
  const filteredServices = useMemo(() => {
    let list = VAULT_SERVICES;

    // Category filter
    if (activeCategory !== 'all' && activeCategory !== 'packages') {
      list = list.filter((s) => s.category === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          (s.isLandingPage && q.includes('landing'))
      );
    }

    return list;
  }, [activeCategory, searchQuery]);

  // Filtered packages
  const filteredPackages = useMemo(() => {
    if (activeCategory !== 'all' && activeCategory !== 'packages') {
      return POPULAR_PACKAGES.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return POPULAR_PACKAGES.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.deliverables.some((d) => d.toLowerCase().includes(q))
      );
    }
    return POPULAR_PACKAGES;
  }, [activeCategory, searchQuery]);

  const showPackagesSection = activeCategory === 'all' || activeCategory === 'packages';
  const showServicesGrid = activeCategory !== 'packages';

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-100">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-900/80">
        <button
          onClick={onBackToServices}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#140e2b] border border-[#a855f7]/40 hover:border-[#fb7185] text-xs font-semibold text-slate-200 hover:text-white uppercase tracking-wider transition-all cursor-pointer shadow-sm group"
          style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
          aria-label="Back to Services & Capabilities"
        >
          <ArrowLeft className="w-4 h-4 text-[#fb7185] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Services</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="hidden sm:inline">Services</span>
          <span className="hidden sm:inline">/</span>
          <span className="text-[#fb7185] font-semibold">The Service Vault</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#140e2b] border border-[#a855f7]/30 text-xs font-mono text-[#c084fc] uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#fb7185]" />
          <span>Curated Freelance Catalogue</span>
        </div>

        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4"
          style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
        >
          THE SERVICE VAULT
        </h1>

        <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal text-balance">
          Your next big idea starts here. Explore our creative, digital and design services.
        </p>
      </div>

      {/* Mandatory Indicative Pricing Policy Banner */}
      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-[#090714] border border-[#a855f7]/30 shadow-[0_0_30px_rgba(168,85,247,0.08)]">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#fb7185] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-1.5">
            <p>
              <strong className="text-white font-semibold">Indicative Pricing Policy: </strong>
              Prices are indicative starting estimates. Final pricing depends on project scope, deliverables, complexity, content readiness, timeline, and revisions. A confirmed quote will be shared after discussing your requirements.
            </p>
            <p className="text-slate-400 text-xs">
              Domain registration, cloud hosting, third-party software subscriptions, paid plugins, and external APIs are charged separately where applicable.
            </p>
          </div>
        </div>
      </div>

      {/* Academic & College Services Privacy Notice (Shown when Academic category is active) */}
      {activeCategory === 'academic' && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-[#140e2b] border border-[#f59e0b]/40 text-slate-200">
          <div className="flex items-start gap-3">
            <GraduationCap className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm leading-relaxed">
              <span className="text-[#f59e0b] font-mono uppercase font-bold text-xs tracking-wider block mb-1">
                Academic & College Services — Confidential Consultation
              </span>
              <p className="text-slate-300 mb-1">
                Availability, deliverables, and custom pricing are discussed privately after inquiry. Orders are subject to current workload, academic deadlines, and manual confirmation.
              </p>
              <p className="text-slate-400 text-xs">
                Printing, binding, and finished-work local delivery are subject to localized availability and schedule confirmation. No public prices or exact radius are published.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search & Category Filter Section */}
      <div className="space-y-4 mb-8">
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search all services (e.g. Landing Page, Logo, Pitch Deck, Analytics)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0c0919] border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-[#fb7185] focus:ring-1 focus:ring-[#fb7185]/40 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Tabs (Scrollable on mobile, flex-wrap on desktop) */}
        <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
          <div className="flex sm:flex-wrap items-center gap-2 justify-start sm:justify-center min-w-max sm:min-w-0 px-1">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-[#f43f5e] to-[#a855f7] text-white font-bold border-[#fb7185] shadow-[0_0_15px_rgba(244,63,94,0.35)]'
                  : 'bg-[#120d24] text-slate-300 border-slate-800 hover:border-[#a855f7]/40 hover:text-white'
              }`}
            >
              All Categories
            </button>

            {VAULT_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.key;
              const isAcademic = cat.isAcademic;

              return (
                <button
                  key={cat.key}
                  onClick={() => onSelectCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? isAcademic
                        ? 'bg-[#f59e0b] text-black font-bold border-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                        : 'bg-gradient-to-r from-[#f43f5e] to-[#a855f7] text-white font-bold border-[#fb7185] shadow-[0_0_15px_rgba(244,63,94,0.35)]'
                      : isAcademic
                      ? 'bg-[#140e2b] text-[#f59e0b] border-[#f59e0b]/40 hover:border-[#f59e0b]'
                      : 'bg-[#120d24] text-slate-300 border-slate-800 hover:border-[#a855f7]/40 hover:text-white'
                  }`}
                >
                  {isAcademic && <GraduationCap className="w-3.5 h-3.5" />}
                  {cat.key === 'packages' && <Package className="w-3.5 h-3.5" />}
                  <span>{cat.shortLabel}</span>
                  {isAcademic && (
                    <span className="text-[9px] px-1 rounded bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30">
                      Private
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Category Description Header */}
      {activeCategory !== 'all' && (
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 sm:p-4 rounded-xl bg-[#090714] border border-slate-800 text-xs sm:text-sm">
          <div>
            <span className="font-mono text-[#fb7185] uppercase text-xs font-semibold block">
              Active Category
            </span>
            <span className="text-white font-bold">
              {VAULT_CATEGORIES.find((c) => c.key === activeCategory)?.label || activeCategory}
            </span>
            <p className="text-slate-400 text-xs mt-0.5">
              {VAULT_CATEGORIES.find((c) => c.key === activeCategory)?.description}
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-mono text-[#c084fc] hover:text-[#fb7185] underline transition-colors cursor-pointer shrink-0"
          >
            Show All Categories
          </button>
        </div>
      )}

      {/* =================================================================== */}
      {/* SECTION 1: CURATED SERVICES GRID                                    */}
      {/* =================================================================== */}
      {showServicesGrid && (
        <div className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <h2
              className="text-xl sm:text-2xl font-bold text-white tracking-wide flex items-center gap-2"
              style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
            >
              <Layers className="w-5 h-5 text-[#fb7185]" />
              <span>
                {activeCategory === 'all'
                  ? 'Curated Studio Services'
                  : VAULT_CATEGORIES.find((c) => c.key === activeCategory)?.label}
              </span>
            </h2>
            <span className="text-xs font-mono text-slate-500">
              {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} available
            </span>
          </div>

          {filteredServices.length === 0 ? (
            <div className="p-10 rounded-2xl bg-[#090714] border border-slate-800 text-center text-slate-400">
              <p className="text-sm">No services match your search query &ldquo;{searchQuery}&rdquo;.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs font-mono text-[#fb7185] underline"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredServices.map((service) => {
                const isAcademic = service.isAcademic;

                return (
                  <div
                    key={service.id}
                    className="p-5 sm:p-6 rounded-2xl bg-obsidian-card border border-slate-800 hover:border-[#a855f7]/50 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-[0_0_30px_rgba(168,85,247,0.12)] relative"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#c084fc] bg-[#140e2b] px-2 py-0.5 rounded border border-[#a855f7]/20">
                          {VAULT_CATEGORIES.find((c) => c.key === service.category)?.shortLabel || service.category}
                        </span>

                        {isAcademic && (
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#f59e0b] bg-[#f59e0b]/10 border border-[#f59e0b]/40 px-2 py-0.5 rounded font-semibold">
                            LIMITED AVAILABILITY
                          </span>
                        )}

                        {service.isLandingPage && (
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#fb7185] bg-[#fb7185]/10 border border-[#fb7185]/30 px-2 py-0.5 rounded">
                            Landing Page
                          </span>
                        )}
                      </div>

                      {/* Service Name */}
                      <h3
                        className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-[#fb7185] transition-colors leading-snug"
                        style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                      >
                        {service.name}
                      </h3>

                      {/* Service Description */}
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>

                      {/* Optional Scope Notes */}
                      {service.scopeNotes && (
                        <p className="text-slate-400 text-[11px] font-mono leading-relaxed mb-4 p-2 rounded bg-[#100b24] border border-slate-800">
                          {service.scopeNotes}
                        </p>
                      )}
                    </div>

                    {/* Bottom Pricing & Action Section */}
                    <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
                      {/* Pricing Display */}
                      <div>
                        {isAcademic ? (
                          <div className="flex items-center gap-1.5 text-xs text-[#f59e0b] font-mono">
                            <Shield className="w-3.5 h-3.5" />
                            <span>Pricing Decided on Confirmation</span>
                          </div>
                        ) : (
                          <div className="text-xs font-mono text-[#c084fc] font-semibold">
                            {service.priceDisplay}
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() =>
                          onDiscussService(
                            service.name,
                            isAcademic ? 'Pricing Decided on Confirmation' : service.priceDisplay,
                            isAcademic
                              ? 'Request for Academic & College Services. Availability and pricing to be confirmed privately.'
                              : `Inquiry for ${service.name} (${service.priceDisplay})`
                          )
                        }
                        className={`w-full py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                          isAcademic
                            ? 'bg-[#140e2b] hover:bg-[#1f1542] text-[#f59e0b] border border-[#f59e0b]/50 hover:border-[#f59e0b]'
                            : 'bg-gradient-to-r from-[#f43f5e] to-[#a855f7] hover:from-[#fb7185] hover:to-[#c084fc] text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                        }`}
                        style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                      >
                        <span>{isAcademic ? 'INQUIRE FOR DETAILS' : 'DISCUSS THIS SERVICE'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* SECTION 2: POPULAR PACKAGES                                         */}
      {/* =================================================================== */}
      {showPackagesSection && (
        <div id="vault-packages" className="mb-14 scroll-mt-20">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#090714] border border-[#a855f7]/35 relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.12)]">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8 pb-6 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#fb7185] uppercase tracking-wider mb-1 font-semibold">
                  <Package className="w-4 h-4" />
                  <span>Curated Starter Bundles</span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                >
                  POPULAR PACKAGES
                </h2>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed">
                Fast-track your rollout with pre-scoped creative and engineering packages. Prices shown are indicative introductory rates.
              </p>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`p-5 sm:p-6 rounded-2xl bg-[#0e0a1f] border transition-all duration-300 flex flex-col justify-between group ${
                    pkg.popular
                      ? 'border-[#fb7185]/60 shadow-[0_0_25px_rgba(244,63,94,0.18)] ring-1 ring-[#fb7185]/30'
                      : 'border-slate-800 hover:border-[#a855f7]/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#c084fc] bg-[#140e2b] px-2 py-0.5 rounded border border-[#a855f7]/30">
                        {VAULT_CATEGORIES.find((c) => c.key === pkg.category)?.shortLabel || pkg.category}
                      </span>
                      {pkg.popular && (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-white bg-[#f43f5e] font-bold px-2 py-0.5 rounded">
                          MOST POPULAR
                        </span>
                      )}
                    </div>

                    <h3
                      className="text-lg font-bold text-white mb-2 group-hover:text-[#fb7185] transition-colors"
                      style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                    >
                      {pkg.name}
                    </h3>

                    {/* Introductory Price */}
                    <div className="mb-3">
                      <span className="text-sm font-mono text-[#fb7185] font-bold block">
                        {pkg.introPrice}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">
                        Indicative introductory estimate
                      </span>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                      {pkg.description}
                    </p>

                    {/* Deliverables List */}
                    <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-800/80">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                        Includes:
                      </span>
                      {pkg.deliverables.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#fb7185] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-4 border-t border-slate-800">
                    <button
                      onClick={() =>
                        onDiscussService(
                          pkg.name,
                          pkg.introPrice,
                          `Interested in the ${pkg.name} package (${pkg.introPrice}).`
                        )
                      }
                      className="w-full py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#f43f5e] to-[#a855f7] hover:from-[#fb7185] hover:to-[#c084fc] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                      style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                    >
                      <span>DISCUSS THIS PACKAGE</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky-friendly Return Banner */}
      <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4
            className="text-lg font-bold text-white"
            style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
          >
            Looking for something tailored?
          </h4>
          <p className="text-xs text-slate-400">
            Tell us about your specific goals, constraints, or unique integrations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToServices}
            className="px-4 py-2 rounded-lg bg-[#140e2b] border border-slate-800 hover:border-[#a855f7]/50 text-xs font-semibold text-slate-300 hover:text-white uppercase tracking-wider transition-all cursor-pointer"
            style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
          >
            ← Back to Services
          </button>

          <button
            onClick={() => onDiscussService('Custom Build / Bespoke Requirement')}
            className="group relative inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold tracking-[0.14em] uppercase text-slate-100 bg-[#140e2b] hover:bg-[#1d123d] border border-[#a855f7]/40 hover:border-[#fb7185]/75 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.35)] hover:shadow-[0_0_20px_rgba(251,113,133,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fb7185]/80"
            style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
          >
            <span className="group-hover:text-white transition-colors">Start a Project Brief</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#fb7185] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};
