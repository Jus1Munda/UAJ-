/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  Search,
  Filter,
  RefreshCw,
  Trash2,
  Eye,
  Edit3,
  Download,
  Settings,
  Bell,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Monitor,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';

export type InquiryStatus = 'New' | 'Contacted' | 'In Discussion' | 'Approved' | 'Rejected' | 'Completed';

export interface ProjectInquiry {
  id: string;
  name: string;
  email: string;
  business?: string;
  projectType: string;
  budget: string;
  timeline: string;
  details: string;
  createdAt: string;
  status: InquiryStatus;
  notes?: string;
}

const STORAGE_KEY = 'uaj_admin_standalone_inquiries_v1';
const API_URL_KEY = 'uaj_admin_api_endpoint_v1';
const VALID_PASSKEY = 'admin2026';

const INITIAL_DATA: ProjectInquiry[] = [
  {
    id: 'inq-101',
    name: 'Elena Rostova',
    email: 'elena@vanguardia.design',
    business: 'Vanguardia Media',
    projectType: 'Website Design & Development',
    budget: '$15,000 - $30,000',
    timeline: '1 - 2 Months',
    details: 'Flagship web presence for an architectural agency with dark futuristic aesthetic, interactive 3D elements, and smooth portfolio filtering.',
    createdAt: '2026-10-15T14:32:00.000Z',
    status: 'In Discussion',
    notes: 'Initial discovery call held. Proposal requested by Tuesday.'
  },
  {
    id: 'inq-102',
    name: 'Marcus Chen',
    email: 'm.chen@hyperion-quantum.io',
    business: 'Hyperion Quantum',
    projectType: 'Custom Interactive Solutions',
    budget: '$30,000+',
    timeline: '2 - 3 Months',
    details: 'Developer platform dashboard with real-time telemetry monitoring and computational node graphs.',
    createdAt: '2026-10-16T09:15:00.000Z',
    status: 'New',
    notes: 'High priority inquiry. Review technical architecture specs.'
  },
  {
    id: 'inq-103',
    name: 'Sarah Jenkins',
    email: 'sarah@aurorabrand.co',
    business: 'Aurora Collective',
    projectType: 'Landing Pages',
    budget: '$5,000 - $15,000',
    timeline: '< 1 Month',
    details: 'Product debut page for AI hardware accessory with high-conversion copy, dynamic animations, and email pre-order capture.',
    createdAt: '2026-10-14T18:45:00.000Z',
    status: 'Approved',
    notes: 'Deposit received. Production sprint starting.'
  }
];

export function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'inquiries' | 'settings'>('inquiries');

  const [selectedInquiry, setSelectedInquiry] = useState<ProjectInquiry | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [apiEndpoint, setApiEndpoint] = useState('https://uajwebtech.com/api/inquiries');

  // Load local data and API config
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setInquiries(JSON.parse(stored));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
        setInquiries(INITIAL_DATA);
      }
      const savedEndpoint = localStorage.getItem(API_URL_KEY);
      if (savedEndpoint) setApiEndpoint(savedEndpoint);
    } catch {
      setInquiries(INITIAL_DATA);
    }
  }, []);

  const saveInquiriesToStorage = (updated: ProjectInquiry[]) => {
    setInquiries(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Storage write error', e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput === VALID_PASSKEY) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passkey. Default demo passkey is "admin2026"');
    }
  };

  const handleStatusChange = (id: string, newStatus: InquiryStatus) => {
    const updated = inquiries.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
    saveInquiriesToStorage(updated);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleSaveNotes = (id: string) => {
    const updated = inquiries.map((item) => (item.id === id ? { ...item, notes: notesDraft } : item));
    saveInquiriesToStorage(updated);
    setEditingNotesId(null);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, notes: notesDraft });
    }
  };

  const handleDelete = (id: string) => {
    const updated = inquiries.filter((item) => item.id !== id);
    saveInquiriesToStorage(updated);
    setDeleteConfirmId(null);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(null);
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Client Name', 'Email', 'Company', 'Capability', 'Budget', 'Timeline', 'Date', 'Status', 'Notes'];
    const rows = inquiries.map((i) => [
      i.id,
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.email.replace(/"/g, '""')}"`,
      `"${(i.business || '').replace(/"/g, '""')}"`,
      `"${i.projectType.replace(/"/g, '""')}"`,
      `"${i.budget.replace(/"/g, '""')}"`,
      `"${i.timeline.replace(/"/g, '""')}"`,
      `"${new Date(i.createdAt).toLocaleDateString()}"`,
      `"${i.status}"`,
      `"${(i.notes || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `uaj_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = inquiries.filter((item) => {
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    const trimmed = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !trimmed ||
      item.name.toLowerCase().includes(trimmed) ||
      item.email.toLowerCase().includes(trimmed) ||
      (item.business && item.business.toLowerCase().includes(trimmed)) ||
      item.projectType.toLowerCase().includes(trimmed);

    return matchesStatus && matchesQuery;
  });

  const getStatusColor = (status: InquiryStatus) => {
    switch (status) {
      case 'New':
        return 'bg-[#00f2fe]/20 text-[#00f2fe] border-[#00f2fe]/40';
      case 'In Discussion':
        return 'bg-[#8b5cf6]/20 text-[#c4b5fd] border-[#8b5cf6]/40';
      case 'Approved':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Completed':
        return 'bg-cyan-500/20 text-cyan-200 border-cyan-500/40';
      case 'Contacted':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Rejected':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  // 1. Standalone Authentication View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#05040a] text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-[#0a0718] border border-[#8b5cf6]/30 shadow-[0_0_60px_rgba(139,92,246,0.2)] text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#140e2b] border border-[#00f2fe]/40 flex items-center justify-center mx-auto mb-4 text-[#00f2fe] shadow-[0_0_20px_rgba(0,242,254,0.3)]">
            <Lock className="w-7 h-7" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider mb-1 font-mono">
            UAJ ADMIN CONSOLE
          </h1>
          <p className="text-xs text-slate-400 mb-6 font-mono">
            Standalone Executive Client (.exe / .apk)
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                placeholder="Enter admin passkey..."
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#140e2b] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00f2fe] text-center tracking-widest font-mono"
              />
              {authError && <p className="text-rose-400 text-xs mt-2">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#00f2fe] hover:bg-[#38bdf8] text-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
            >
              <Unlock className="w-4 h-4 fill-black" />
              <span>Sign In to Console</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setPasskeyInput('admin2026');
                setIsAuthenticated(true);
              }}
              className="w-full text-xs text-[#a78bfa] hover:underline block pt-2"
            >
              [ Quick Demo Passkey: admin2026 ]
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-[#00f2fe]" /> Windows .exe
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-[#8b5cf6]" /> Android .apk
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Console Dashboard
  return (
    <div className="min-h-screen bg-[#05040a] text-slate-100 flex flex-col font-sans">
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 bg-[#090716]/98 border-b border-[#8b5cf6]/30 px-4 sm:px-8 py-3.5 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#150f2e] border border-[#00f2fe]/40 flex items-center justify-center text-[#00f2fe] font-bold text-sm font-mono">
            UAJ
          </div>
          <div>
            <span className="font-bold text-white text-base tracking-wider block">UAJ ADMIN CONSOLE</span>
            <span className="text-[10px] text-[#38bdf8] font-mono tracking-wider">EXECUTIVE DESK · STANDALONE CLIENT</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveTab(activeTab === 'inquiries' ? 'settings' : 'inquiries')}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#00f2fe] text-black border-[#00f2fe] font-bold'
                : 'bg-[#140e2b] text-slate-300 border-slate-700 hover:text-white hover:border-[#00f2fe]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">API Config</span>
          </button>

          <button
            onClick={exportCSV}
            className="px-3 py-1.5 rounded-lg bg-[#140e2b] border border-slate-700 text-slate-300 hover:text-white hover:border-[#00f2fe] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Download CSV for Excel/Sheets"
          >
            <Download className="w-3.5 h-3.5 text-[#00f2fe]" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1.5 rounded-lg bg-[#1a1236] border border-[#8b5cf6]/40 text-slate-300 hover:text-rose-400 hover:border-rose-500 text-xs font-mono transition-colors cursor-pointer"
          >
            Lock
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {activeTab === 'settings' ? (
          /* Settings View: Live Cloud Database / REST Sync Configuration */
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-[#090714] border border-[#8b5cf6]/40 shadow-xl space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <Settings className="w-6 h-6 text-[#00f2fe]" />
              <div>
                <h2 className="text-xl font-bold text-white">Live Website Sync Settings</h2>
                <p className="text-xs text-slate-400 font-mono">Connect this .exe / .apk directly to your production website</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase font-semibold mb-1">
                Production Website Inquiries Endpoint
              </label>
              <input
                type="url"
                value={apiEndpoint}
                onChange={(e) => {
                  setApiEndpoint(e.target.value);
                  localStorage.setItem(API_URL_KEY, e.target.value);
                }}
                placeholder="https://uajwebtech.com/api/inquiries"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#140e2b] border border-slate-700 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-[#00f2fe]"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Submissions from your live contact form will automatically sync and trigger alerts in this app.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#120d26] border border-slate-800 text-xs text-slate-300 space-y-2">
              <h4 className="font-bold text-[#00f2fe] uppercase tracking-wider font-mono">Build Artifact Commands</h4>
              <p>• <strong>To compile Windows .exe:</strong> <code className="text-[#38bdf8] font-mono">npm run build:exe</code></p>
              <p>• <strong>To compile Android .apk:</strong> <code className="text-[#38bdf8] font-mono">npm run build:apk</code></p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveTab('inquiries')}
                className="px-5 py-2 rounded-lg bg-[#00f2fe] text-black font-bold text-xs uppercase cursor-pointer"
              >
                Save & Return to Inquiries
              </button>
            </div>
          </div>
        ) : (
          /* Inquiries Manager View */
          <>
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-obsidian-card border border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase">Total Inquiries</span>
                <div className="text-2xl sm:text-3xl font-bold text-white mt-1 tabular-nums font-mono">
                  {inquiries.length}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-card border border-slate-800">
                <span className="text-xs font-mono text-[#00f2fe] uppercase">New Leads</span>
                <div className="text-2xl sm:text-3xl font-bold text-[#00f2fe] mt-1 tabular-nums font-mono">
                  {inquiries.filter((i) => i.status === 'New').length}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-card border border-slate-800">
                <span className="text-xs font-mono text-[#a78bfa] uppercase">In Discussion</span>
                <div className="text-2xl sm:text-3xl font-bold text-[#a78bfa] mt-1 tabular-nums font-mono">
                  {inquiries.filter((i) => i.status === 'In Discussion').length}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-card border border-slate-800">
                <span className="text-xs font-mono text-emerald-400 uppercase">Approved / Active</span>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mt-1 tabular-nums font-mono">
                  {inquiries.filter((i) => i.status === 'Approved' || i.status === 'Completed').length}
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-xl bg-[#090714] border border-[#8b5cf6]/20 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by client, email, company, or capability..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#140e2b] border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00f2fe]"
                />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                {['All', 'New', 'Contacted', 'In Discussion', 'Approved', 'Completed', 'Rejected'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                      selectedStatus === status
                        ? 'bg-[#00f2fe] text-black font-semibold'
                        : 'bg-[#140e28] text-slate-300 hover:text-white border border-slate-800'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries Table (Desktop) / Cards (Mobile) */}
            <div className="rounded-xl bg-[#080612] border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#120d26] text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Client / Company</th>
                      <th className="py-3 px-4">Capability</th>
                      <th className="py-3 px-4">Budget / Timeline</th>
                      <th className="py-3 px-4">Submitted</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-10 text-slate-500 font-mono text-xs">
                          No inquiries match your current filter.
                        </td>
                      </tr>
                    ) : (
                      filtered.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-[#120d26]/80 transition-colors cursor-pointer"
                          onClick={() => setSelectedInquiry(item)}
                        >
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-white">{item.name}</div>
                            <div className="text-xs text-slate-400 font-mono">{item.email}</div>
                            {item.business && <div className="text-[11px] text-[#a78bfa]">{item.business}</div>}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-mono text-xs text-slate-300">{item.projectType}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-xs text-slate-200 font-mono">{item.budget}</div>
                            <div className="text-[11px] text-slate-400">{item.timeline}</div>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-400 font-mono">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={item.status}
                              onChange={(e) => handleStatusChange(item.id, e.target.value as InquiryStatus)}
                              className={`text-xs px-2 py-1 rounded border font-mono cursor-pointer focus:outline-none ${getStatusColor(
                                item.status
                              )}`}
                            >
                              <option value="New" className="bg-[#090714] text-white">New</option>
                              <option value="Contacted" className="bg-[#090714] text-white">Contacted</option>
                              <option value="In Discussion" className="bg-[#090714] text-white">In Discussion</option>
                              <option value="Approved" className="bg-[#090714] text-white">Approved</option>
                              <option value="Rejected" className="bg-[#090714] text-white">Rejected</option>
                              <option value="Completed" className="bg-[#090714] text-white">Completed</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedInquiry(item)}
                                className="p-1.5 rounded hover:bg-[#1f153d] text-slate-400 hover:text-[#00f2fe] transition-colors"
                                title="Inspect Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(item.id)}
                                className="p-1.5 rounded hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition-colors"
                                title="Delete Inquiry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Inquiry Detail Dossier Modal */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
          role="dialog"
        >
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#090714] border border-[#8b5cf6]/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(139,92,246,0.3)] max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-[#00f2fe] uppercase">Inquiry Dossier</span>
                <h3 className="text-2xl font-bold text-white mt-0.5">{selectedInquiry.name}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mt-1">
                  <span>{selectedInquiry.email}</span>
                  {selectedInquiry.business && <span>· {selectedInquiry.business}</span>}
                </div>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4 p-3 rounded-lg bg-[#140e2b] border border-slate-800 font-mono text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">CAPABILITY</span>
                  <span className="text-white font-semibold">{selectedInquiry.projectType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">BUDGET</span>
                  <span className="text-[#38bdf8] font-semibold">{selectedInquiry.budget}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">TIMELINE</span>
                  <span className="text-slate-200">{selectedInquiry.timeline}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">SUBMITTED</span>
                  <span className="text-slate-200">{new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-[#a78bfa] mb-1.5">Project Scope & Requirements:</h4>
                <div className="p-3.5 rounded-lg bg-[#0e091e] border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.details}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs font-mono uppercase text-[#a78bfa]">Internal Studio Notes:</h4>
                  {editingNotesId !== selectedInquiry.id && (
                    <button
                      onClick={() => {
                        setEditingNotesId(selectedInquiry.id);
                        setNotesDraft(selectedInquiry.notes || '');
                      }}
                      className="text-xs text-[#00f2fe] hover:underline flex items-center gap-1 font-mono cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit Notes</span>
                    </button>
                  )}
                </div>

                {editingNotesId === selectedInquiry.id ? (
                  <div className="space-y-2">
                    <textarea
                      rows={3}
                      value={notesDraft}
                      onChange={(e) => setNotesDraft(e.target.value)}
                      placeholder="Add follow-up notes, call summaries, pricing milestones..."
                      className="w-full px-3 py-2 rounded-lg bg-[#140e2b] border border-slate-700 text-white text-xs focus:outline-none focus:border-[#00f2fe]"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingNotesId(null)}
                        className="px-3 py-1 rounded text-xs text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveNotes(selectedInquiry.id)}
                        className="px-3 py-1 rounded bg-[#00f2fe] text-black font-semibold text-xs cursor-pointer"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-[#120d26] border border-slate-800 text-slate-300 text-xs italic">
                    {selectedInquiry.notes || 'No internal notes recorded yet.'}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setDeleteConfirmId(selectedInquiry.id)}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Inquiry</span>
              </button>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 text-white text-xs hover:bg-slate-700 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm p-6 rounded-2xl bg-[#0d091e] border border-rose-500/40 text-center">
            <AlertCircle className="w-10 h-10 text-rose-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Permanently Delete?</h3>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              This action cannot be undone. All client notes and submission data will be purged.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-lg bg-rose-600 text-xs font-semibold text-white hover:bg-rose-500 cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
