/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Lock, CheckCircle2, AlertTriangle, Send, ShieldCheck, ArrowRight } from 'lucide-react';
import { saveInquiry } from '../utils/inquiryStorage';

interface PrivatePortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivatePortfolioModal: React.FC<PrivatePortfolioModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    reason: ''
  });

  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    reason?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const errors: { name?: string; email?: string; reason?: string } = {};

    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!formData.reason.trim()) {
      errors.reason = 'Please provide a brief reason for requesting access.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    const payload = {
      requestType: 'private_portfolio_request',
      name: formData.name.trim(),
      email: formData.email.trim(),
      business: formData.company.trim() || undefined,
      company: formData.company.trim() || undefined,
      projectType: 'Private Portfolio Access',
      budget: 'Portfolio Review Request',
      timeline: 'Immediate Access Requested',
      details: formData.reason.trim(),
      reason: formData.reason.trim()
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
        const errorMsg =
          data.error || `Unable to transmit portfolio request (HTTP ${response.status}). Please try again.`;
        setSubmissionError(errorMsg);
        setIsSubmitting(false);
        return;
      }

      // Persistently record locally in studio inquiry registry
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
      console.error('Private portfolio request transmission failed:', err);
      setSubmissionError(
        err.message || 'Network error: Failed to reach the server. Please check your connection and try again.'
      );
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setSubmissionError(null);
    setValidationErrors({});
    setFormData({
      name: '',
      email: '',
      company: '',
      reason: ''
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="fixed inset-0"
        onClick={handleResetAndClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-[#0b0817] border border-[#8b5cf6]/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(139,92,246,0.25)] z-10 overflow-hidden">
        {/* Ambient background glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f2fe]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8b5cf6]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 sm:py-8 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-[#00f2fe]/10 border border-[#00f2fe]/40 text-[#00f2fe] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,242,254,0.3)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-mono text-[#00f2fe] uppercase tracking-wider block mb-1">
                Request Recorded
              </span>
              <h3
                id="portfolio-modal-title"
                className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase"
                style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
              >
                Access Request Received
              </h3>
            </div>

            <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
              Your request for private client case studies has been securely transmitted to the studio via Telegram. Our team reviews NDA-protected briefings promptly and will share a secure viewing link with your email shortly.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#140e2b] border border-[#00f2fe]/30 text-xs font-mono text-[#00f2fe]">
              <Send className="w-3.5 h-3.5" />
              <span>Delivered to UAJ Telegram Channel</span>
            </div>

            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="w-full py-3 rounded-lg bg-[#00f2fe] hover:bg-[#38bdf8] text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(0,242,254,0.3)]"
                style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
              >
                Return to Portfolio
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-3 pr-8">
              <div className="w-10 h-10 rounded-xl bg-[#140e2b] border border-[#8b5cf6]/40 flex items-center justify-center text-[#00f2fe] shrink-0 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#a78bfa] uppercase font-semibold">
                  Confidential Showcase
                </span>
                <h3
                  id="portfolio-modal-title"
                  className="text-xl sm:text-2xl font-bold text-white tracking-wide uppercase leading-tight"
                  style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                >
                  Request Private Portfolio
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
              Select client web platforms and production case studies are protected under NDA. Complete this brief request to receive private access credentials.
            </p>

            {submissionError && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{submissionError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-[#00f2fe]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (validationErrors.name) {
                      setValidationErrors({ ...validationErrors, name: undefined });
                    }
                  }}
                  disabled={isSubmitting}
                  placeholder="e.g. Alex Drake"
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-[#140e2b]/80 border ${
                    validationErrors.name ? 'border-red-500/70' : 'border-slate-800 focus:border-[#00f2fe]'
                  } text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#00f2fe] transition-all`}
                />
                {validationErrors.name && (
                  <p className="text-red-400 text-[11px] mt-1">{validationErrors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-[#00f2fe]">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (validationErrors.email) {
                      setValidationErrors({ ...validationErrors, email: undefined });
                    }
                  }}
                  disabled={isSubmitting}
                  placeholder="e.g. alex@company.com"
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-[#140e2b]/80 border ${
                    validationErrors.email ? 'border-red-500/70' : 'border-slate-800 focus:border-[#00f2fe]'
                  } text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#00f2fe] transition-all`}
                />
                {validationErrors.email && (
                  <p className="text-red-400 text-[11px] mt-1">{validationErrors.email}</p>
                )}
              </div>

              {/* Company (Optional) */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Company / Organization <span className="text-slate-500">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  disabled={isSubmitting}
                  placeholder="e.g. Acme Studio or Independent"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#140e2b]/80 border border-slate-800 focus:border-[#00f2fe] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#00f2fe] transition-all"
                />
              </div>

              {/* Reason for Access */}
              <div>
                <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                  Reason for Requesting Access <span className="text-[#00f2fe]">*</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.reason}
                  onChange={(e) => {
                    setFormData({ ...formData, reason: e.target.value });
                    if (validationErrors.reason) {
                      setValidationErrors({ ...validationErrors, reason: undefined });
                    }
                  }}
                  disabled={isSubmitting}
                  placeholder="Tell us what type of case studies or platforms you are looking to review..."
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-[#140e2b]/80 border ${
                    validationErrors.reason ? 'border-red-500/70' : 'border-slate-800 focus:border-[#00f2fe]'
                  } text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#00f2fe] transition-all resize-none`}
                />
                {validationErrors.reason && (
                  <p className="text-red-400 text-[11px] mt-1">{validationErrors.reason}</p>
                )}
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                  style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-lg bg-[#00f2fe] hover:bg-[#38bdf8] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,242,254,0.3)]"
                  style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 fill-black" />
                      <span>Submit Access Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
