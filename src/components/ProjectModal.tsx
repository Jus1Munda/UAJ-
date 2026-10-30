/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Send,
  ArrowLeft,
  ArrowRight,
  Shield,
  Tag
} from 'lucide-react';
import { UAJLogo } from './UAJLogo';
import { saveInquiry } from '../utils/inquiryStorage';
import {
  VAULT_CATEGORIES,
  VAULT_SERVICES,
  POPULAR_PACKAGES,
  VaultCategoryKey
} from '../data/serviceVaultData';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialBudget?: string;
  initialNotes?: string;
}

const BUDGET_OPTIONS = [
  'Under ₹5,000 (Micro / Starter)',
  '₹5,000 – ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000+ (Full Suite / Enterprise)',
  'Flexible / Discuss after inquiry',
  'Custom / Other'
];

const ACADEMIC_BUDGET_OPTIONS = [
  'Discuss after inquiry (Private Confirmation)',
  'Flexible Schedule / Scope Based'
];

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Website Design & Development',
  initialBudget,
  initialNotes
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Step 1: Client Information
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    budget: '',
    timeline: '1 - 2 Months',
    details: initialNotes || ''
  });

  // Step 2: Project Information
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<VaultCategoryKey>('websites');
  const [selectedServiceName, setSelectedServiceName] = useState<string>('');
  const [customBudgetValue, setCustomBudgetValue] = useState<string>(initialBudget || '');

  // Validation errors
  const [step1Errors, setStep1Errors] = useState<{ name?: string; email?: string }>({});
  const [step2Errors, setStep2Errors] = useState<{
    category?: string;
    service?: string;
    budget?: string;
    details?: string;
  }>({});

  // Synchronize when initial props change or modal re-opens
  useEffect(() => {
    if (!isOpen) return;

    if (initialNotes) {
      setFormData((prev) => ({ ...prev, details: initialNotes }));
    }

    if (initialBudget) {
      setCustomBudgetValue(initialBudget);
      const isKnownBudget = BUDGET_OPTIONS.includes(initialBudget);
      setFormData((prev) => ({
        ...prev,
        budget: isKnownBudget ? initialBudget : 'Custom / Other'
      }));
    }

    if (initialService) {
      // 1. Check if matches Popular Packages
      const pkgMatch = POPULAR_PACKAGES.find(
        (p) =>
          p.name.toLowerCase() === initialService.toLowerCase() ||
          initialService.toLowerCase().includes(p.name.toLowerCase())
      );
      if (pkgMatch) {
        setSelectedCategoryKey('packages');
        setSelectedServiceName(pkgMatch.name);
        if (!initialBudget) {
          setCustomBudgetValue(pkgMatch.introPrice);
          setFormData((prev) => ({
            ...prev,
            budget: 'Custom / Other'
          }));
        }
        return;
      }

      // 2. Check if matches Landing Pages shorthand
      if (initialService.toLowerCase().includes('landing')) {
        setSelectedCategoryKey('websites');
        setSelectedServiceName('Landing Page Design');
        return;
      }

      // 3. Check if matches a specific Vault Service
      const svcMatch = VAULT_SERVICES.find(
        (s) =>
          s.name.toLowerCase() === initialService.toLowerCase() ||
          initialService.toLowerCase().includes(s.name.toLowerCase())
      );
      if (svcMatch) {
        setSelectedCategoryKey(svcMatch.category);
        setSelectedServiceName(svcMatch.name);
        if (svcMatch.category === 'academic') {
          setFormData((prev) => ({
            ...prev,
            budget: 'Discuss after inquiry (Private Confirmation)'
          }));
        }
        return;
      }

      // 4. Check if matches a Category directly
      const catMatch = VAULT_CATEGORIES.find(
        (c) =>
          c.label.toLowerCase() === initialService.toLowerCase() ||
          c.key.toLowerCase() === initialService.toLowerCase() ||
          initialService.toLowerCase().includes(c.shortLabel.toLowerCase())
      );
      if (catMatch) {
        setSelectedCategoryKey(catMatch.key);
        setSelectedServiceName('');
        if (catMatch.key === 'academic') {
          setFormData((prev) => ({
            ...prev,
            budget: 'Discuss after inquiry (Private Confirmation)'
          }));
        }
        return;
      }

      // Default fallback
      setSelectedCategoryKey('websites');
      setSelectedServiceName('');
    }
  }, [isOpen, initialService, initialBudget, initialNotes]);

  // Available services based on selected category
  const availableServices = useMemo(() => {
    if (!selectedCategoryKey) return [];
    if (selectedCategoryKey === 'packages') {
      return POPULAR_PACKAGES.map((pkg) => ({
        id: pkg.id,
        name: pkg.name,
        priceDisplay: pkg.introPrice,
        isAcademic: false,
        isPackage: true
      }));
    }
    return VAULT_SERVICES.filter((s) => s.category === selectedCategoryKey).map((s) => ({
      id: s.id,
      name: s.name,
      priceDisplay: s.priceDisplay,
      isAcademic: Boolean(s.isAcademic),
      isPackage: false
    }));
  }, [selectedCategoryKey]);

  // Selected service metadata for pricing reference
  const selectedServiceInfo = useMemo(() => {
    if (!selectedServiceName) return null;
    return availableServices.find((s) => s.name === selectedServiceName) || null;
  }, [selectedServiceName, availableServices]);

  if (!isOpen) return null;

  const isAcademicCategory = selectedCategoryKey === 'academic';

  // Handler for category change: resets dependent service selector
  const handleCategoryChange = (newCatKey: VaultCategoryKey) => {
    setSelectedCategoryKey(newCatKey);
    setSelectedServiceName(''); // Reset dependent service selection
    setStep2Errors((prev) => ({ ...prev, category: undefined, service: undefined }));

    if (newCatKey === 'academic') {
      setFormData((prev) => ({
        ...prev,
        budget: 'Discuss after inquiry (Private Confirmation)'
      }));
    } else if (formData.budget.includes('Discuss after inquiry')) {
      setFormData((prev) => ({ ...prev, budget: '' }));
    }
  };

  // Handler for service change
  const handleServiceChange = (serviceName: string) => {
    setSelectedServiceName(serviceName);
    setStep2Errors((prev) => ({ ...prev, service: undefined }));
  };

  // Step 1 validation & proceed to Step 2
  const handleContinueToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; email?: string } = {};

    if (!formData.name.trim()) {
      errors.name = 'Client name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address (e.g. name@company.com).';
    }

    if (Object.keys(errors).length > 0) {
      setStep1Errors(errors);
      return;
    }

    setStep1Errors({});
    setStep(2);
  };

  // Step 2 final submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: {
      category?: string;
      service?: string;
      budget?: string;
      details?: string;
    } = {};

    if (!selectedCategoryKey) {
      errors.category = 'Please select a project capability / category.';
    }

    if (!selectedServiceName) {
      errors.service = 'Please choose a specific service.';
    }

    const effectiveBudget = isAcademicCategory
      ? 'Discuss after inquiry (Private Confirmation)'
      : formData.budget === 'Custom / Other'
      ? customBudgetValue.trim()
      : formData.budget.trim();

    if (!isAcademicCategory && !effectiveBudget) {
      errors.budget = 'Please select your estimated budget range.';
    }

    if (!formData.details.trim()) {
      errors.details = 'Please describe your project requirements.';
    }

    if (Object.keys(errors).length > 0) {
      setStep2Errors(errors);
      return;
    }

    setStep2Errors({});
    setIsSubmitting(true);
    setSubmissionError(null);

    const categoryMeta = VAULT_CATEGORIES.find((c) => c.key === selectedCategoryKey);
    const categoryLabel = categoryMeta ? categoryMeta.label : selectedCategoryKey;
    const projectType = selectedServiceName
      ? `${categoryLabel} — ${selectedServiceName}`
      : categoryLabel;

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      business: formData.business.trim() || undefined,
      projectType,
      budget: effectiveBudget,
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
        const errorMsg =
          data.error || `Inquiry could not be dispatched (HTTP ${response.status}).`;
        setSubmissionError(errorMsg);
        setIsSubmitting(false);
        return;
      }

      // Persistently record locally in studio registry
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
        err.message ||
          'Network error: Failed to reach the server. Please check your connection and try again.'
      );
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setSubmissionError(null);
    setStep(1);
    setStep1Errors({});
    setStep2Errors({});
    setFormData({
      name: '',
      email: '',
      business: '',
      budget: '',
      timeline: '1 - 2 Months',
      details: ''
    });
    setSelectedCategoryKey('websites');
    setSelectedServiceName('');
    setCustomBudgetValue('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="min-h-full flex items-center justify-center py-4 sm:py-6">
        <div className="relative w-full max-w-xl rounded-2xl bg-[#090714] border border-[#a855f7]/40 shadow-[0_0_60px_rgba(168,85,247,0.25)] p-5 sm:p-6 overflow-hidden">
          {/* Subtle corner glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#f43f5e]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-[#f43f5e]/10 border border-[#fb7185] text-[#fb7185] flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3
              className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
            >
              PROJECT INQUIRY RECORDED
            </h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto mb-4 leading-relaxed">
              Your inquiry has been stored securely and dispatched directly to the studio Telegram
              channel via @NuwayXNotifyBot.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f43f5e]/10 border border-[#fb7185]/30 text-[#fb7185] text-xs font-mono mb-6">
              <Send className="w-3 h-3" />
              <span>Delivered to NuwayX Telegram Channel</span>
            </div>
            <div>
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#f43f5e] to-[#a855f7] hover:from-[#fb7185] hover:to-[#c084fc] text-white font-bold text-sm tracking-wide uppercase transition-colors cursor-pointer shadow-md"
                style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
              >
                Return to Studio
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header with Monogram Logo */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-auto aspect-[520/340] relative flex items-center justify-center">
                <UAJLogo
                  className="h-8 w-auto"
                  size="navbar"
                  animate={false}
                  showAura={false}
                  idPrefix="modal"
                />
              </div>
              <div>
                <h3
                  id="modal-title"
                  className="text-xl sm:text-2xl font-bold text-white tracking-wide"
                  style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                >
                  START A PROJECT
                </h3>
                <span className="text-xs text-[#c084fc] font-mono">
                  NuwayX Tech · Telegram Connected
                </span>
              </div>
            </div>

            {/* Clear Two-Step Progress Indicator */}
            <div className="flex items-center gap-2 sm:gap-3 mb-5 pb-3 border-b border-slate-800/90 select-none">
              <div
                className={`flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-semibold tracking-wider transition-colors ${
                  step === 1 ? 'text-[#fb7185]' : 'text-slate-300'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step === 1
                      ? 'bg-[#f43f5e]/20 text-[#fb7185] border border-[#fb7185]'
                      : 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/60'
                  }`}
                >
                  {step > 1 ? '✓' : '1'}
                </span>
                <span>01 — YOUR DETAILS</span>
              </div>

              <span className="text-slate-600 font-mono text-xs">→</span>

              <div
                className={`flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-semibold tracking-wider transition-colors ${
                  step === 2 ? 'text-[#fb7185]' : 'text-slate-500'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step === 2
                      ? 'bg-[#f43f5e]/20 text-[#fb7185] border border-[#fb7185]'
                      : 'bg-[#140e2b] text-slate-500 border border-slate-800'
                  }`}
                >
                  2
                </span>
                <span>02 — PROJECT DETAILS</span>
              </div>
            </div>

            {/* ========================================================== */}
            {/* STEP 1: CLIENT INFORMATION                                  */}
            {/* ========================================================== */}
            {step === 1 && (
              <form onSubmit={handleContinueToStep2} className="space-y-4">
                <div>
                  <label
                    htmlFor="client-name"
                    className="block text-xs font-mono text-slate-300 mb-1 uppercase font-semibold"
                  >
                    Client Name *
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    placeholder="Alex Drake"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (step1Errors.name) setStep1Errors({ ...step1Errors, name: undefined });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-[#140e2b] border text-white placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                      step1Errors.name
                        ? 'border-rose-500/80 focus:border-rose-400'
                        : 'border-slate-700 focus:border-[#fb7185]'
                    }`}
                  />
                  {step1Errors.name && (
                    <p className="mt-1 text-xs text-rose-400 font-mono flex items-center gap-1">
                      <span>⚠</span> {step1Errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="client-email"
                    className="block text-xs font-mono text-slate-300 mb-1 uppercase font-semibold"
                  >
                    Email Address *
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (step1Errors.email) setStep1Errors({ ...step1Errors, email: undefined });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-[#140e2b] border text-white placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                      step1Errors.email
                        ? 'border-rose-500/80 focus:border-rose-400'
                        : 'border-slate-700 focus:border-[#fb7185]'
                    }`}
                  />
                  {step1Errors.email && (
                    <p className="mt-1 text-xs text-rose-400 font-mono flex items-center gap-1">
                      <span>⚠</span> {step1Errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="client-business"
                    className="block text-xs font-mono text-slate-300 mb-1 uppercase font-semibold"
                  >
                    Business / Organization Name (Optional)
                  </label>
                  <input
                    id="client-business"
                    type="text"
                    placeholder="e.g. Apex Industrial Co. / Personal Brand"
                    value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#140e2b] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#fb7185] transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#f43f5e] to-[#a855f7] hover:from-[#fb7185] hover:to-[#c084fc] text-white font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.35)]"
                    style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                  >
                    <span>Continue to Project Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* ========================================================== */}
            {/* STEP 2: PROJECT INFORMATION                                 */}
            {/* ========================================================== */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* 1. Project Capability / Service Category */}
                <div>
                  <label
                    htmlFor="project-category"
                    className="block text-xs font-mono text-slate-300 mb-1 uppercase font-semibold"
                  >
                    1. Project Capability / Service Category *
                  </label>
                  <select
                    id="project-category"
                    required
                    value={selectedCategoryKey}
                    onChange={(e) => handleCategoryChange(e.target.value as VaultCategoryKey)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#140e2b] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#fb7185] transition-colors cursor-pointer"
                  >
                    {VAULT_CATEGORIES.map((cat) => (
                      <option key={cat.key} value={cat.key}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  {step2Errors.category && (
                    <p className="mt-1 text-xs text-rose-400 font-mono">{step2Errors.category}</p>
                  )}
                </div>

                {/* 2. Specific Service (Dependent Selector) */}
                <div>
                  <label
                    htmlFor="specific-service"
                    className="block text-xs font-mono text-slate-300 mb-1 uppercase font-semibold"
                  >
                    2. Specific Service *
                  </label>
                  <select
                    id="specific-service"
                    required
                    value={selectedServiceName}
                    onChange={(e) => handleServiceChange(e.target.value)}
                    disabled={!selectedCategoryKey || availableServices.length === 0}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-[#140e2b] border text-white text-xs sm:text-sm focus:outline-none transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                      step2Errors.service
                        ? 'border-rose-500/80 focus:border-rose-400'
                        : 'border-slate-700 focus:border-[#fb7185]'
                    }`}
                  >
                    <option value="">
                      {!selectedCategoryKey
                        ? 'Select a category first'
                        : 'Choose a specific service'}
                    </option>
                    {availableServices.map((svc) => (
                      <option key={svc.id} value={svc.name}>
                        {svc.name}
                      </option>
                    ))}
                  </select>
                  {step2Errors.service && (
                    <p className="mt-1 text-xs text-rose-400 font-mono">{step2Errors.service}</p>
                  )}

                  {/* Compact inline pricing summary immediately below Specific Service */}
                  {selectedServiceInfo && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs font-mono">
                      {selectedServiceInfo.isAcademic ? (
                        <>
                          <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="text-amber-400/90 font-medium">
                            {selectedServiceInfo.name} · Discuss after inquiry
                          </span>
                        </>
                      ) : selectedServiceInfo.isPackage ? (
                        <>
                          <Tag className="w-3.5 h-3.5 text-[#fb7185] shrink-0" />
                          <span className="text-slate-300">
                            <span className="text-white font-medium">{selectedServiceInfo.name}</span>
                            <span className="text-slate-500 mx-1">·</span>
                            <span className="text-[#fb7185] font-semibold">
                              Starting at {selectedServiceInfo.priceDisplay.replace(/^Introductory price:\s*/i, '')}
                            </span>
                            <span className="text-slate-400 text-[11px] ml-1.5 font-normal">(Indicative)</span>
                          </span>
                        </>
                      ) : (
                        <>
                          <Tag className="w-3.5 h-3.5 text-[#fb7185] shrink-0" />
                          <span className="text-slate-300">
                            <span className="text-white font-medium">{selectedServiceInfo.name}</span>
                            <span className="text-slate-500 mx-1">·</span>
                            <span className="text-[#fb7185] font-semibold">
                              {selectedServiceInfo.priceDisplay}
                            </span>
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* 3. Estimated Budget (Client-selected budget) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="client-budget"
                      className="block text-xs font-mono text-slate-300 uppercase font-semibold"
                    >
                      3. Estimated Budget *
                    </label>
                    <span className="text-[10px] font-mono text-slate-500">
                      Client-allocated budget
                    </span>
                  </div>

                  {isAcademicCategory ? (
                    <select
                      id="client-budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#140e2b] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#fb7185] transition-colors cursor-pointer"
                    >
                      {ACADEMIC_BUDGET_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      id="client-budget"
                      required
                      value={formData.budget}
                      onChange={(e) => {
                        setFormData({ ...formData, budget: e.target.value });
                        if (step2Errors.budget)
                          setStep2Errors({ ...step2Errors, budget: undefined });
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-[#140e2b] border text-white text-xs sm:text-sm focus:outline-none transition-colors cursor-pointer ${
                        step2Errors.budget
                          ? 'border-rose-500/80 focus:border-rose-400'
                          : 'border-slate-700 focus:border-[#fb7185]'
                      }`}
                    >
                      <option value="">-- Select your estimated budget range --</option>
                      {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}

                  {/* Custom budget input if selected */}
                  {formData.budget === 'Custom / Other' && !isAcademicCategory && (
                    <div className="mt-1.5">
                      <input
                        type="text"
                        placeholder="Enter your specific target budget (e.g. ₹18,000)"
                        value={customBudgetValue}
                        onChange={(e) => setCustomBudgetValue(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#140e2b] border border-[#fb7185]/50 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#fb7185]"
                      />
                    </div>
                  )}

                  {step2Errors.budget && (
                    <p className="mt-1 text-xs text-rose-400 font-mono">{step2Errors.budget}</p>
                  )}
                </div>

                {/* 4. Desired Timeline */}
                <div>
                  <label
                    htmlFor="desired-timeline"
                    className="block text-xs font-mono text-slate-300 mb-1 uppercase font-semibold"
                  >
                    4. Desired Timeline
                  </label>
                  <select
                    id="desired-timeline"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#140e2b] border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#fb7185] transition-colors cursor-pointer"
                  >
                    <option value="Urgent (< 2 Weeks)">Urgent (&lt; 2 Weeks)</option>
                    <option value="1 - 2 Months">1 - 2 Months</option>
                    <option value="2 - 3 Months">2 - 3 Months</option>
                    <option value="Flexible Schedule">Flexible Schedule</option>
                  </select>
                </div>

                {/* 5. Project Requirements */}
                <div>
                  <label
                    htmlFor="project-requirements"
                    className="block text-xs font-mono text-slate-300 mb-1 uppercase font-semibold"
                  >
                    5. Project Requirements *
                  </label>
                  <textarea
                    id="project-requirements"
                    rows={3}
                    required
                    placeholder="Describe your goals, required features, and any important details."
                    value={formData.details}
                    onChange={(e) => {
                      setFormData({ ...formData, details: e.target.value });
                      if (step2Errors.details)
                        setStep2Errors({ ...step2Errors, details: undefined });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-[#140e2b] border text-white placeholder-slate-500 text-sm focus:outline-none transition-colors resize-none ${
                      step2Errors.details
                        ? 'border-rose-500/80 focus:border-rose-400'
                        : 'border-slate-700 focus:border-[#fb7185]'
                    }`}
                  />
                  {step2Errors.details && (
                    <p className="mt-1 text-xs text-rose-400 font-mono">{step2Errors.details}</p>
                  )}
                </div>

                {/* Telegram Delivery Error Banner */}
                {submissionError && (
                  <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-2.5 animate-in fade-in">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-rose-300">Telegram Notification Status</p>
                      <p className="mt-0.5 leading-relaxed text-slate-300 text-[11px]">
                        {submissionError}
                      </p>
                    </div>
                  </div>
                )}

                {/* Back and Submit Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setStep2Errors({});
                    }}
                    className="order-2 sm:order-1 px-4 py-2.5 rounded-lg border border-slate-700 hover:border-slate-500 hover:bg-slate-800/40 text-slate-300 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="order-1 sm:order-2 flex-1 py-2.5 sm:py-3 px-5 rounded-lg bg-gradient-to-r from-[#f43f5e] to-[#a855f7] hover:from-[#fb7185] hover:to-[#c084fc] text-white font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.35)] hover:shadow-[0_0_25px_rgba(244,63,94,0.45)] disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                  >
                    <Zap className="w-4 h-4 fill-white text-white" />
                    <span>{isSubmitting ? 'Sending to Telegram...' : 'Submit Project Brief'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);
};
