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
