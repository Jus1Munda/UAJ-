/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Code2,
  Layout,
  Rocket,
  Presentation,
  Sparkles,
  Sliders,
  GraduationCap,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Package
} from 'lucide-react';

export interface CapabilitiesProps {
  onSelectService?: (serviceName: string) => void;
  onExploreCategory?: (categoryKey: string, filter?: string) => void;
}

export const Capabilities: React.FC<CapabilitiesProps> = ({
  onSelectService,
  onExploreCategory
}) => {
  const [activeCard, setActiveCard] = useState<number>(0);

  const services = [
    {
      title: 'Website Design & Development',
      categoryKey: 'websites',
      desc: 'Bespoke, high-performance websites engineered with modern React, responsive mobile layouts, and fast load times.',
      badge: 'FLAGSHIP',
      icon: Code2,
      highlights: [
        'Custom web architecture with clean code',
        'Mobile-first responsive design',
        'SEO-optimized semantic structure'
      ],
      isLimited: false
    },
    {
      title: 'UI/UX Design',
      categoryKey: 'ui-ux',
      desc: 'Refined user interfaces and intuitive interaction flows designed with high visual contrast and user delight.',
      badge: 'DESIGN',
      icon: Layout,
      highlights: [
        'Dark-premium design systems',
        'Component design & typography hierarchy',
        'Interactive Figma prototypes & specs'
      ],
      isLimited: false
    },
    {
      title: 'Landing Pages',
      categoryKey: 'websites',
      filter: 'landing',
      desc: 'High-converting product launch pages designed to showcase ambitious ideas and turn visitors into clients.',
      badge: 'CONVERSION',
      icon: Rocket,
      highlights: [
        'Compelling narrative structure',
        'Fast lead capture & inquiry forms',
        'Engaging scroll animations'
      ],
      isLimited: false
    },
    {
      title: 'Presentation Design',
      categoryKey: 'presentation',
      desc: 'Cinematic pitch decks and digital presentation experiences that communicate complex ideas clearly and powerfully.',
      badge: 'CREATIVE',
      icon: Presentation,
      highlights: [
        'Executive deck styling & slide decks',
        'Data visualization & clean graphics',
        'Interactive web-based slide formats'
      ],
      isLimited: false
    },
    {
      title: 'Creative Design & Branding',
      categoryKey: 'branding',
      desc: 'Custom logos, YouTube thumbnails, brand identity assets, SVG graphics, and animated visual elements for creators, businesses, and digital brands.',
      badge: 'BRANDING',
      icon: Sparkles,
      highlights: [
        'Custom logos, SVG logos & brand marks',
        'YouTube thumbnails & creator graphics',
        'Brand identity & animated visual assets'
      ],
      isLimited: false
    },
    {
      title: 'Custom Interactive Solutions',
      categoryKey: 'interactive',
      desc: 'Specialized web tools, client dashboards, and interactive calculators engineered for specific workflow needs.',
      badge: 'SOLUTIONS',
      icon: Sliders,
      highlights: [
        'Real-time data interfaces',
        'Secure inquiry & client portals',
        'API & database integrations'
      ],
      isLimited: false
    },
    {
      title: 'Academic & College Services',
      categoryKey: 'academic',
      desc: 'Convenient academic support for college students, from assignment preparation and presentation design to printing, binding, and local delivery, subject to availability.',
      badge: 'LIMITED AVAILABILITY',
      icon: GraduationCap,
      highlights: [
        'Assignment writing & document preparation',
        'PPTs, project reports & notes formatting',
        'Printing, binding & finished-work delivery'
      ],
      availabilityNotice:
        'Orders depend on current availability, workload, and confirmation. Local service area and delivery feasibility will be communicated privately after inquiry.',
      isLimited: true
    },
    {
      title: 'Popular Packages',
      categoryKey: 'packages',
      desc: 'Explore curated starter bundles with indicative introductory pricing for websites, branding, presentations, and creator services.',
      badge: 'CURATED BUNDLES',
      icon: Package,
      buttonLabel: 'EXPLORE PACKAGES',
      highlights: [
        'Curated starter bundles with upfront pricing',
        'Websites, branding, pitch decks & creator kits',
        'Fast-track delivery with structured deliverables'
      ],
      isLimited: false
    }
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#fb7185] block mb-1.5 font-semibold">
            Capabilities & Services
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
          >
            STUDIO CAPABILITIES
          </h2>
        </div>
        <p className="text-slate-400 max-w-md text-sm mt-3 md:mt-0 leading-relaxed">
          We bring creative vision and technical precision together to build impactful digital solutions for ambitious clients.
        </p>
      </div>

      {/* Grid of Studio Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((item, idx) => {
          const Icon = item.icon;
          const isSelected = activeCard === idx;

          return (
            <div
              key={item.title}
              onClick={() => setActiveCard(idx)}
              className={`p-6 rounded-xl bg-obsidian-card transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-[#fb7185]/60 shadow-[0_0_25px_rgba(244,63,94,0.18)] ring-1 ring-[#fb7185]/40'
                  : 'hover:border-[#c084fc]/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#140f28] border border-[#a855f7]/30 flex items-center justify-center text-[#fb7185]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded border ${
                      item.isLimited
                        ? 'text-[#f59e0b] border-[#f59e0b]/40 bg-[#f59e0b]/10'
                        : 'text-[#c084fc] border-[#a855f7]/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3
                  className="text-lg font-bold text-white mb-2"
                  style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                >
                  {item.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">{item.desc}</p>

                {/* Optional Availability Notice for Academic & College Services */}
                {item.availabilityNotice && (
                  <div className="mb-4 p-3 rounded-lg bg-[#140e2b]/90 border border-[#a855f7]/40 text-slate-300 text-xs leading-relaxed flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#f59e0b] font-mono font-semibold uppercase text-[10px] block mb-0.5">
                        Workload & Availability Notice
                      </span>
                      <span>{item.availabilityNotice}</span>
                    </div>
                  </div>
                )}

                {/* Highlights */}
                <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-800/80">
                  {item.highlights.map((point) => (
                    <div key={point} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#fb7185] shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Working Action Button: EXPLORE SERVICES ↗ */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <span className={`text-[11px] font-mono ${item.isLimited ? 'text-[#f59e0b]' : 'text-[#c084fc]'}`}>
                  {item.isLimited ? 'Limited Availability' : 'Ready to build'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onExploreCategory) {
                      onExploreCategory(item.categoryKey, item.filter);
                    } else if (onSelectService) {
                      onSelectService(item.title);
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#f43f5e] to-[#a855f7] hover:from-[#fb7185] hover:to-[#c084fc] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm group/btn"
                  style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                  aria-label={item.buttonLabel ? `${item.buttonLabel} in ${item.title}` : `Explore services in ${item.title}`}
                >
                  <span>{item.buttonLabel || 'EXPLORE SERVICES'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
