import type { CampaignStatus } from '../../types/api.types';

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  leads: number;
  converted: number;
  spent: number;
  revenue: number;
}

export interface LeadSourceData {
  source: string;
  count: number;
}

export interface LeadTrendData {
  month: string;
  newLeads: number;
  converted: number;
}

export interface CampaignsState {
  campaigns: Campaign[];
  leadSources: LeadSourceData[];
  leadTrend: LeadTrendData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}