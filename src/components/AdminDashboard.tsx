/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  getInquiries,
  updateInquiryStatus,
  updateInquiryNotes,
  deleteInquiry,
  filterInquiries,
  ProjectInquiry,
  InquiryStatus
} from '../utils/inquiryStorage';
import { UAJLogo } from './UAJLogo';
import {
  Shield,
  Search,
  Filter,
  CheckCircle2,
  Trash2,
  Edit3,
  Calendar,
  DollarSign,
  ArrowLeft,
  Lock,
  Unlock,
  AlertCircle,
  Eye,
  RefreshCw
} from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

const VALID_PASSKEY = 'admin2026';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedInquiry, setSelectedInquiry] = useState<ProjectInquiry | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const loadData = () => {
    setInquiries(getInquiries());
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('uaj_inquiries_updated', handleUpdate);
    return () => window.removeEventListener('uaj_inquiries_updated', handleUpdate);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput === VALID_PASSKEY) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect administrative passkey. Try "admin2026"');
    }
  };

  const handleStatusChange = (id: string, newStatus: InquiryStatus) => {
    const updated = updateInquiryStatus(id, newStatus);
    setInquiries(updated);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleSaveNotes = (id: string) => {
    const updated = updateInquiryNotes(id, notesDraft);
    setInquiries(updated);
    setEditingNotesId(null);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, notes: notesDraft });
    }
  };

  const handleDelete = (id: string) => {
    const updated = deleteInquiry(id);
    setInquiries(updated);
    setDeleteConfirmId(null);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(null);
    }
  };

  const filtered = filterInquiries(inquiries, searchQuery, selectedStatus);

  // Statistics calculation
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === 'New').length;
  const inDiscussionCount = inquiries.filter((i) => i.status === 'In Discussion').length;
  const approvedCount = inquiries.filter((i) => i.status === 'Approved' || i.status === 'Completed').length;

  const getStatusBadgeColor = (status: InquiryStatus) => {
    switch (status) {
      case 'New':
        return 'bg-[#00f2fe]/20 text-[#00f2fe] border-[#00f2fe]/40';
      case 'In Discussion':
        return 'bg-[#8b5cf6]/20 text-[#c4b5fd] border-[#8b5cf6]/40';
      case 'Approved':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'Completed':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'Contacted':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Rejected':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  // 1. Password Protection Barrier
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#05040a] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-[#0a0718] border border-[#8b5cf6]/30 shadow-[0_0_60px_rgba(139,92,246,0.2)] text-center">
          <div className="w-12 h-12 rounded-xl bg-[#150e2d] border border-[#8b5cf6]/40 flex items-center justify-center mx-auto mb-4 text-[#00f2fe]">
            <Lock className="w-6 h-6" />
          </div>

          <h2
            className="text-2xl font-bold text-white mb-1"
            style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
          >
            STUDIO ADMIN PORTAL
          </h2>
          <p className="text-xs text-slate-400 mb-6 font-mono">
            UAJ WEB TECH · Restricted Management Console
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                placeholder="Enter admin passkey..."
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#140e2b] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00f2fe] text-center tracking-widest font-mono"
              />
              {authError && <p className="text-rose-400 text-xs mt-2">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#00f2fe] hover:bg-[#38bdf8] text-black font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
              style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
            >
              <Unlock className="w-4 h-4 fill-black" />
              <span>Authenticate Portal</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setPasskeyInput('admin2026');
                setIsAuthenticated(true);
              }}
              className="w-full text-[11px] text-[#a78bfa] hover:underline block pt-1"
            >
              [ Quick Access Demo Passkey: admin2026 ]
            </button>

            <div className="pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5 mx-auto"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 2. Full Admin Dashboard Interface
  return (
    <div className="fixed inset-0 z-50 bg-[#05040a] text-slate-100 flex flex-col overflow-y-auto">
      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-30 bg-[#090716]/95 border-b border-[#8b5cf6]/20 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-7 w-auto aspect-[520/340] relative flex items-center justify-center">
            <UAJLogo className="h-7 w-auto" size="navbar" animate={false} showAura={false} idPrefix="admin-header" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className="font-bold text-white text-base tracking-wider"
                style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
              >
                UAJ INQUIRY MANAGER
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#8b5cf6]/20 text-[#c4b5fd] border border-[#8b5cf6]/40">
                ADMIN SECURE
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="p-2 rounded-lg bg-[#140e2b] border border-slate-700 text-slate-300 hover:text-white hover:border-[#00f2fe] text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Refresh Inquiries"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-[#1c1438] border border-[#8b5cf6]/40 text-slate-200 hover:text-white hover:border-[#00f2fe] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Studio</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-obsidian-card border border-slate-800">
            <div className="text-xs font-mono text-slate-400 uppercase">Total Inquiries</div>
            <div className="text-2xl sm:text-3xl font-bold text-white mt-1 tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
              {totalCount}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-obsidian-card border border-slate-800">
            <div className="text-xs font-mono text-[#00f2fe] uppercase">New Submissions</div>
            <div className="text-2xl sm:text-3xl font-bold text-[#00f2fe] mt-1 tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
              {newCount}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-obsidian-card border border-slate-800">
            <div className="text-xs font-mono text-[#a78bfa] uppercase">In Discussion</div>
            <div className="text-2xl sm:text-3xl font-bold text-[#a78bfa] mt-1 tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
              {inDiscussionCount}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-obsidian-card border border-slate-800">
            <div className="text-xs font-mono text-emerald-400 uppercase">Approved / Active</div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mt-1 tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
              {approvedCount}
            </div>
          </div>
        </div>

        {/* Filter and Search Controls */}
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

          {/* Status Filters */}
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

        {/* Table of Inquiries */}
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
                          className={`text-xs px-2 py-1 rounded border font-mono cursor-pointer focus:outline-none ${getStatusBadgeColor(
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
      </div>

      {/* Inquiry Detail Drawer / Modal */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
          role="dialog"
        >
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#090714] border border-[#8b5cf6]/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(139,92,246,0.3)] max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-[#00f2fe] uppercase">Inquiry Dossier</span>
                <h3
                  className="text-2xl font-bold text-white mt-0.5"
                  style={{ fontFamily: 'var(--font-display, "Rajdhani", sans-serif)' }}
                >
                  {selectedInquiry.name}
                </h3>
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
                <h4 className="text-xs font-mono uppercase text-[#a78bfa] mb-1.5">Project Requirements:</h4>
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
                      className="text-xs text-[#00f2fe] hover:underline flex items-center gap-1 font-mono"
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
                      placeholder="Add follow-up notes, client call summaries, or milestone estimates..."
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
                        className="px-3 py-1 rounded bg-[#00f2fe] text-black font-semibold text-xs"
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
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Inquiry</span>
              </button>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 text-white text-xs hover:bg-slate-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm p-6 rounded-2xl bg-[#0d091e] border border-rose-500/40 text-center">
            <AlertCircle className="w-10 h-10 text-rose-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Delete Inquiry?</h3>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              This action permanently removes this client dossier from your persistent storage.
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
                className="px-4 py-2 rounded-lg bg-rose-600 text-xs font-semibold text-white hover:bg-rose-500"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
