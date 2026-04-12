import axiosInstance from './axiosInstance';
import type {
  Campaign,
  LeadSourceData,
  LeadTrendData,
} from '../features/campaigns/campaignsTypes';

// Three separate API calls — one per endpoint.
// We'll fire all three in parallel using Promise.all in the thunk.
export const fetchCampaignsApi = async (): Promise<Campaign[]> => {
  const response = await axiosInstance.get<Campaign[]>('/campaigns');
  return response.data;
};

export const fetchLeadSourcesApi = async (): Promise<LeadSourceData[]> => {
  const response = await axiosInstance.get<LeadSourceData[]>('/leadSources');
  return response.data;
};

export const fetchLeadTrendApi = async (): Promise<LeadTrendData[]> => {
  const response = await axiosInstance.get<LeadTrendData[]>('/leadTrend');
  return response.data;
};