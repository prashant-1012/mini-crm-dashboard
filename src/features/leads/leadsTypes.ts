import type { LeadStatus } from '../../types/api.types';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: string;
  assignedTo: string;
  createdAt: string;
  value: number;
}

export interface LeadsState {
  leads: Lead[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  // These live in Redux so filters survive navigation
  searchQuery: string;
  statusFilter: LeadStatus | 'All';
  currentPage: number;
  pageSize: number;
}