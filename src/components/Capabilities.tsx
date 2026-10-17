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
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface CapabilitiesProps {
  onSelectService: (serviceName: string) => void;
}

export const Capabilities: React.FC<CapabilitiesProps> = ({ onSelectService }) => {
  const [activeCard, setActiveCard] = useState<number>(0);

  const services = [
    {
      title: 'Website Design & Development',
      desc: 'Bespoke, high-performance websites engineered with modern React, responsive mobile layouts, and fast load times.',
      badge: 'FLAGSHIP',
      icon: Code2,
      highlights: [
        'Custom web architecture with clean code',
        'Mobile-first responsive design',
        'SEO-optimized semantic structure'
      ]
    },
    {
      title: 'UI/UX Design',
      desc: 'Refined user interfaces and intuitive interaction flows designed with high visual contrast and user delight.',
      badge: 'DESIGN',
      icon: Layout,
      highlights: [
        'Dark-premium design systems',
        'Component design & typography hierarchy',
        'Interactive Figma prototypes & specs'
      ]
    },
    {
      title: 'Landing Pages',
      desc: 'High-converting product launch pages designed to showcase ambitious ideas and turn visitors into clients.',
      badge: 'CONVERSION',
      icon: Rocket,
      highlights: [
        'Compelling narrative structure',
        'Fast lead capture & inquiry forms',
        'Engaging scroll animations'
      ]
    },
    {
      title: 'Presentation Design',
      desc: 'Cinematic pitch decks and digital presentation experiences that communicate complex ideas clearly and powerfully.',
      badge: 'CREATIVE',
      icon: Presentation,
      highlights: [
        'Executive deck styling & slide decks',
        'Data visualization & clean graphics',
        'Interactive web-based slide formats'
      ]
    },
    {
      title: 'Creative Digital Experiences',
      desc: 'Memorable brand touchpoints featuring custom vector illustrations, kinetic animations, and immersive visuals.',
      badge: 'EXPERIENCE',
      icon: Sparkles,
      highlights: [
        'Custom SVG logos & brand marks',
        'Smooth micro-interactions & shimmers',
        'Atmospheric lighting & dark aesthetics'
      ]
    },
    {
      title: 'Custom Interactive Solutions',
      desc: 'Specialized web tools, client dashboards, and interactive calculators engineered for specific workflow needs.',
      badge: 'SOLUTIONS',
      icon: Sliders,
      highlights: [
        'Real-time data interfaces',
        'Secure inquiry & client portals',
        'API & database integrations'
      ]
    }
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#00f2fe] block mb-1.5 font-semibold">
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

      {/* Grid of 6 Studio Services */}
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
                  ? 'border-[#00f2fe]/60 shadow-[0_0_25px_rgba(0,242,254,0.15)] ring-1 ring-[#00f2fe]/40'
                  : 'hover:border-[#8b5cf6]/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#140f28] border border-[#8b5cf6]/30 flex items-center justify-center text-[#00f2fe]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider text-[#a78bfa] border border-[#8b5cf6]/30 px-2 py-0.5 rounded">
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

                {/* Highlights */}
                <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-800/80">
                  {item.highlights.map((point) => (
                    <div key={point} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00f2fe] shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Working Action Button */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-[#38bdf8]">Ready to build</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectService(item.title);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-[#00f2fe] hover:bg-[#38bdf8] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                >
                  <span>Start Project</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
