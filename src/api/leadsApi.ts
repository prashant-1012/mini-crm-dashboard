import axiosInstance from './axiosInstance';
import type { Lead } from '../features/leads/leadsTypes';

export const fetchLeadsApi = async (): Promise<Lead[]> => {
  const response = await axiosInstance.get<Lead[]>('/leads');
  return response.data;
};