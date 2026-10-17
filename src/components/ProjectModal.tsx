/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Zap, CheckCircle2, Shield } from 'lucide-react';
import { UAJLogo } from './UAJLogo';
import { saveInquiry } from '../utils/inquiryStorage';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Website Design & Development'
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    projectType: initialService,
    budget: '$5,000 - $15,000',
    timeline: '1 - 2 Months',
    details: ''
  });

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, projectType: initialService }));
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save persistently to storage
    setTimeout(() => {
      saveInquiry({
        name: formData.name,
        email: formData.email,
        business: formData.business || undefined,
        projectType: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        details: formData.details
      });

      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      business: '',
      projectType: 'Website Design & Development',
      budget: '$5,000 - $15,000',
      timeline: '1 - 2 Months',
      details: ''
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-[#090714] border border-[#8b5cf6]/40 shadow-[0_0_60px_rgba(139,92,246,0.25)] p-6 sm:p-8 overflow-hidden my-8">
        {/* Subtle corner glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#00f2fe]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-[#00f2fe]/10 border border-[#00f2fe] text-[#00f2fe] flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
            >
              PROJECT INQUIRY RECORDED
            </h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
              Your inquiry has been stored securely in our system. A studio creative lead will review your requirements and reach out within 24 hours.
            </p>
            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-lg bg-[#00f2fe] text-black font-bold text-sm tracking-wide uppercase hover:bg-[#38bdf8] transition-colors cursor-pointer shadow-md"
              style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
            >
              Return to Studio
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-8 w-auto aspect-[520/340] relative flex items-center justify-center">
                <UAJLogo className="h-8 w-auto" size="navbar" animate={false} showAura={false} idPrefix="modal" />
              </div>
              <div>
                <h3
                  id="modal-title"
                  className="text-xl sm:text-2xl font-bold text-white tracking-wide"
                  style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                >
                  START A PROJECT
                </h3>
                <span className="text-xs text-[#a78bfa] font-mono">UAJ Web Tech · Project Briefing</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1 uppercase font-semibold">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Drake"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#140e2b] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00f2fe] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1 uppercase font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#140e2b] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00f2fe] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 uppercase font-semibold">
                  Business / Organization (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Industrial Co."
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#140e2b] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00f2fe] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1 uppercase font-semibold">
                    Project Capability
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#140e2b] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#00f2fe] transition-colors"
                  >
                    <option value="Website Design & Development">Website Design & Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Landing Pages">Landing Pages</option>
                    <option value="Presentation Design">Presentation Design</option>
                    <option value="Creative Digital Experiences">Creative Digital Experiences</option>
                    <option value="Custom Interactive Solutions">Custom Interactive Solutions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1 uppercase font-semibold">
                    Estimated Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#140e2b] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#00f2fe] transition-colors"
                  >
                    <option value="Under $5,000">Under $5,000</option>
                    <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                    <option value="$15,000 - $30,000">$15,000 - $30,000</option>
                    <option value="$30,000+">$30,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 uppercase font-semibold">
                  Desired Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#140e2b] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#00f2fe] transition-colors"
                >
                  <option value="Urgent (< 2 Weeks)">Urgent (&lt; 2 Weeks)</option>
                  <option value="1 - 2 Months">1 - 2 Months</option>
                  <option value="2 - 3 Months">2 - 3 Months</option>
                  <option value="Flexible">Flexible Schedule</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 uppercase font-semibold">
                  Project Requirements *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your vision, target audience, technical needs, or reference websites..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#140e2b] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00f2fe] transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg bg-[#00f2fe] hover:bg-[#38bdf8] text-slate-950 font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-70"
                  style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>{isSubmitting ? 'Recording Inquiry...' : 'Submit Project Brief'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
