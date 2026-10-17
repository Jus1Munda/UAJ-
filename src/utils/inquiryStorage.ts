/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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

const STORAGE_KEY = 'uaj_web_tech_inquiries_v1';

export const INITIAL_INQUIRIES: ProjectInquiry[] = [
  {
    id: 'inq-101',
    name: 'Elena Rostova',
    email: 'elena@vanguardia.design',
    business: 'Vanguardia Media',
    projectType: 'Website Design & Development',
    budget: '$15,000 - $30,000',
    timeline: '1 - 2 Months',
    details: 'Need a flagship web presence for our architectural agency with dark futuristic aesthetic, interactive 3D elements, and smooth portfolio filtering.',
    createdAt: '2026-10-15T14:32:00.000Z',
    status: 'In Discussion',
    notes: 'Initial discovery call held. Elena requested proposal by Tuesday.'
  },
  {
    id: 'inq-102',
    name: 'Marcus Chen',
    email: 'm.chen@hyperion-quantum.io',
    business: 'Hyperion Quantum',
    projectType: 'Custom Interactive Solutions',
    budget: '$30,000+',
    timeline: '2 - 3 Months',
    details: 'Building a developer platform dashboard with real-time websocket monitoring and interactive computational node graphs.',
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
    details: 'Product launch page for our AI hardware accessory with high-conversion copy, dynamic animations, and email pre-order capture.',
    createdAt: '2026-10-14T18:45:00.000Z',
    status: 'Approved',
    notes: 'Deposit received. Sprint starts Monday.'
  }
];

export function getInquiries(): ProjectInquiry[] {
  if (typeof window === 'undefined') {
    return INITIAL_INQUIRIES;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_INQUIRIES));
      return INITIAL_INQUIRIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_INQUIRIES;
  } catch {
    return INITIAL_INQUIRIES;
  }
}

export function saveInquiry(inquiryData: Omit<ProjectInquiry, 'id' | 'createdAt' | 'status'>): ProjectInquiry {
  const current = getInquiries();
  const newInquiry: ProjectInquiry = {
    ...inquiryData,
    id: `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
    status: 'New'
  };

  const updated = [newInquiry, ...current];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('uaj_inquiries_updated'));
    } catch (e) {
      console.error('Failed to save inquiry to storage', e);
    }
  }

  return newInquiry;
}

export function updateInquiryStatus(id: string, status: InquiryStatus): ProjectInquiry[] {
  const current = getInquiries();
  const updated = current.map((item) => (item.id === id ? { ...item, status } : item));
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('uaj_inquiries_updated'));
  }
  return updated;
}

export function updateInquiryNotes(id: string, notes: string): ProjectInquiry[] {
  const current = getInquiries();
  const updated = current.map((item) => (item.id === id ? { ...item, notes } : item));
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('uaj_inquiries_updated'));
  }
  return updated;
}

export function deleteInquiry(id: string): ProjectInquiry[] {
  const current = getInquiries();
  const updated = current.filter((item) => item.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('uaj_inquiries_updated'));
  }
  return updated;
}

export function filterInquiries(
  inquiries: ProjectInquiry[],
  query: string,
  statusFilter: string
): ProjectInquiry[] {
  const trimmed = query.trim().toLowerCase();
  return inquiries.filter((item) => {
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesQuery =
      !trimmed ||
      item.name.toLowerCase().includes(trimmed) ||
      item.email.toLowerCase().includes(trimmed) ||
      (item.business && item.business.toLowerCase().includes(trimmed)) ||
      item.projectType.toLowerCase().includes(trimmed);

    return matchesStatus && matchesQuery;
  });
}
