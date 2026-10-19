/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Zap, CheckCircle2, Calculator, AlertTriangle, Send } from 'lucide-react';
import { UAJLogo } from './UAJLogo';
import { saveInquiry } from '../utils/inquiryStorage';
import { getStartingPrice, CAPABILITY_PRICE_MAP } from '../utils/pricing';

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
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    projectType: initialService || 'Website Design & Development',
    timeline: '1 - 2 Months',
    details: ''
  });

  useEffect(() => {
    if (initialService) {
      // Find matching standard capability if passed
      let matched = initialService;
      for (const cap of Object.keys(CAPABILITY_PRICE_MAP)) {
        if (initialService.toLowerCase().includes(cap.toLowerCase())) {
          matched = cap;
          break;
        }
      }
      setFormData((prev) => ({ ...prev, projectType: matched }));
    }
  }, [initialService]);

  if (!isOpen) return null;

  const currentEstimatedBudget = getStartingPrice(formData.projectType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    const calculatedBudget = getStartingPrice(formData.projectType);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      business: formData.business.trim() || undefined,
      projectType: formData.projectType || 'Website Design & Development',
      budget: calculatedBudget,
      timeline: formData.timeline,
      details: formData.details.trim()
    };

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        // Do not falsely report success if Telegram delivery fails
        const errorMsg = data.error || `Inquiry could not be dispatched (HTTP ${response.status}).`;
        setSubmissionError(errorMsg);
        setIsSubmitting(false);
        return;
      }

      // Persistently record locally in studio registry as well
      saveInquiry({
        name: payload.name,
        email: payload.email,
        business: payload.business,
        projectType: payload.projectType,
        budget: payload.budget,
        timeline: payload.timeline,
        details: payload.details
      });

      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Inquiry transmission failed:', err);
      setSubmissionError(
        err.message || 'Network error: Failed to reach the server. Please check your connection and try again.'
      );
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setSubmissionError(null);
    setFormData({
      name: '',
      email: '',
      business: '',
      projectType: 'Website Design & Development',
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
            <p className="text-slate-300 text-sm max-w-sm mx-auto mb-4 leading-relaxed">
              Your inquiry has been stored securely and dispatched directly to the studio Telegram group via @UAJNotifyBot.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00f2fe]/10 border border-[#00f2fe]/30 text-[#00f2fe] text-xs font-mono mb-6">
              <Send className="w-3 h-3" />
              <span>Delivered to UAJ Telegram Channel</span>
            </div>
            <div>
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 rounded-lg bg-[#00f2fe] text-black font-bold text-sm tracking-wide uppercase hover:bg-[#38bdf8] transition-colors cursor-pointer shadow-md"
                style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
              >
                Return to Studio
              </button>
            </div>
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
                <span className="text-xs text-[#a78bfa] font-mono">UAJ Web Tech · Telegram Connected</span>
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

              {/* Capability Selection & Read-only Auto-Filled Estimated Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1 uppercase font-semibold">
                    Project Capability *
                  </label>
                  <select
                    required
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#140e2b] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#00f2fe] transition-colors cursor-pointer"
                  >
                    <option value="">-- Select a capability --</option>
                    <option value="Website Design & Development">Website Design & Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Landing Pages">Landing Pages</option>
                    <option value="Presentation Design">Presentation Design</option>
                    <option value="Creative Digital Experiences">Creative Digital Experiences</option>
                    <option value="Custom Interactive Solutions">Custom Interactive Solutions</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-mono text-slate-300 uppercase font-semibold">
                      Estimated Budget
                    </label>
                    <span className="text-[10px] font-mono text-[#00f2fe] uppercase tracking-wider flex items-center gap-1">
                      <Calculator className="w-3 h-3" />
                      <span>Auto-filled</span>
                    </span>
                  </div>
                  {/* Read-Only Auto-Filled Display Box */}
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      tabIndex={-1}
                      aria-readonly="true"
                      value={currentEstimatedBudget}
                      className="w-full px-3.5 py-2 rounded-lg bg-[#0e091e] border border-[#00f2fe]/40 text-[#00f2fe] font-bold text-xs sm:text-sm cursor-not-allowed select-none focus:outline-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]"
                      style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                      title="Estimated budget is automatically calculated based on selected capability"
                    />
                  </div>
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

              {/* Telegram Delivery Error Banner */}
              {submissionError && (
                <div className="p-3.5 rounded-lg bg-rose-950/40 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-2.5 animate-in fade-in">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-rose-300">Telegram Notification Status</p>
                    <p className="mt-0.5 leading-relaxed text-slate-300 text-[11px]">{submissionError}</p>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg bg-[#00f2fe] hover:bg-[#38bdf8] text-slate-950 font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-70"
                  style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>{isSubmitting ? 'Sending to Telegram...' : 'Submit Project Brief'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
