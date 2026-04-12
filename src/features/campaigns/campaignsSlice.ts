import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCampaignsApi,
  fetchLeadSourcesApi,
  fetchLeadTrendApi,
} from '../../api/campaignsApi';
import type { CampaignsState, Campaign, LeadSourceData, LeadTrendData } from './campaignsTypes';

// Defines the shape of data this thunk returns when it succeeds.
// Using an interface here makes the fulfilled action payload
// fully typed — no guessing what's inside action.payload.
interface FetchCampaignsResult {
  campaigns: Campaign[];
  leadSources: LeadSourceData[];
  leadTrend: LeadTrendData[];
}

export const fetchCampaignData = createAsyncThunk<FetchCampaignsResult, void>(
  'campaigns/fetchAll',
  async () => {
    // Promise.all fires all three API calls at the same time.
    // Total wait time = slowest single request, not sum of all three.
    const [campaigns, leadSources, leadTrend] = await Promise.all([
      fetchCampaignsApi(),
      fetchLeadSourcesApi(),
      fetchLeadTrendApi(),
    ]);
    return { campaigns, leadSources, leadTrend };
  }
);

const initialState: CampaignsState = {
  campaigns: [],
  leadSources: [],
  leadTrend: [],
  status: 'idle',
  error: null,
};

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaignData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCampaignData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.campaigns   = action.payload.campaigns;
        state.leadSources = action.payload.leadSources;
        state.leadTrend   = action.payload.leadTrend;
      })
      .addCase(fetchCampaignData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch campaign data';
      });
  },
});

export default campaignsSlice.reducer;