// TypeScript note: A generic type parameter <T> means "I don't know the
// data shape yet — the caller will tell me." This lets one interface
// describe ALL API responses, regardless of what's inside `data`.
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// A union type: status can ONLY be one of these four strings.
// TypeScript will error if you try to assign "Pending" or "active".
export type LeadStatus = 'New' | 'Contacted' | 'Converted' | 'Lost';

export type CampaignStatus = 'Active' | 'Paused' | 'Completed';