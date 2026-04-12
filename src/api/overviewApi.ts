import axiosInstance from './axiosInstance';
import type { KpiCard } from '../features/overview/overviewTypes';

// The return type Promise<KpiCard[]> tells TypeScript exactly
// what this function will give back when it resolves.
// If the API response shape doesn't match KpiCard[], 
// you'll know at the point of use — not at runtime.
export const fetchKpisApi = async (): Promise<KpiCard[]> => {
  const response = await axiosInstance.get<KpiCard[]>('/kpis');
  return response.data;
};