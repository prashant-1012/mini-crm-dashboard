import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchLeadsApi } from '../../api/leadsApi';
import type { LeadsState } from './leadsTypes';
import type { LeadStatus } from '../../types/api.types';

export const fetchLeads = createAsyncThunk(
  'leads/fetchLeads',
  async () => {
    return await fetchLeadsApi();
  }
);

const initialState: LeadsState = {
  leads: [],
  status: 'idle',
  error: null,
  searchQuery: '',
  statusFilter: 'All',
  currentPage: 1,
  pageSize: 8,
};

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // reset to page 1 on new search
    },
    setStatusFilter: (state, action: PayloadAction<LeadStatus | 'All'>) => {
      state.statusFilter = action.payload;
      state.currentPage = 1; // reset to page 1 on filter change
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
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

export const { setSearchQuery, setStatusFilter, setCurrentPage } = leadsSlice.actions;
export default leadsSlice.reducer;