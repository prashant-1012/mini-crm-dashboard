import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { getStoredLeads, saveLeads } from '../../utils/leadsStorage';
import type { Lead, LeadsState } from './leadsTypes';
import type { LeadStatus } from '../../types/api.types';

export const fetchLeads = createAsyncThunk(
  'leads/fetchLeads',
  async () => {
    // We read from localStorage instead of the API to support Vercel persistence
    return getStoredLeads();
  }
);

const initialState: LeadsState = {
  leads: [],
  status: 'idle',
  error: null,
  searchQuery: '',
  statusFilter: 'All',
  sourceFilter: 'All',
  assignedToFilter: 'All',
  currentPage: 1,
  pageSize: 8,
};

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setStatusFilter: (state, action: PayloadAction<LeadStatus | 'All'>) => {
      state.statusFilter = action.payload;
      state.currentPage = 1;
    },
    setSourceFilter: (state, action: PayloadAction<string>) => {
      state.sourceFilter = action.payload;
      state.currentPage = 1;
    },
    setAssignedToFilter: (state, action: PayloadAction<string>) => {
      state.assignedToFilter = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    addLead: (state, action: PayloadAction<Lead>) => {
      state.leads.unshift(action.payload);
      saveLeads(state.leads);
    },
    updateLead: (state, action: PayloadAction<Lead>) => {
      const index = state.leads.findIndex((l) => l.id === action.payload.id);
      if (index !== -1) {
        state.leads[index] = action.payload;
        saveLeads(state.leads);
      }
    },
    deleteLead: (state, action: PayloadAction<string>) => {
      state.leads = state.leads.filter((l) => l.id !== action.payload);
      saveLeads(state.leads);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.leads = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch leads';
      });
  },
});

export const { 
  setSearchQuery, 
  setStatusFilter, 
  setSourceFilter, 
  setAssignedToFilter, 
  setCurrentPage,
  addLead,
  updateLead,
  deleteLead
} = leadsSlice.actions;
export default leadsSlice.reducer;