import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ActivityFeedState, ActivityEvent } from './activityTypes';
import { generateInitialEvents } from '../../utils/activityGenerator';

// Cap the feed at 20 events so the list doesn't grow forever
const MAX_EVENTS = 20;

const initialState: ActivityFeedState = {
  events: generateInitialEvents(8),
  isLive: true,
};

const activitySlice = createSlice({
  name: 'activityFeed',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<ActivityEvent>) => {
      // Add new event at the TOP of the array (unshift = prepend)
      state.events.unshift(action.payload);
      // Trim the list if it exceeds the max — keeps memory clean
      if (state.events.length > MAX_EVENTS) {
        state.events = state.events.slice(0, MAX_EVENTS);
      }
    },
    toggleLive: (state) => {
      state.isLive = !state.isLive;
    },
    clearFeed: (state) => {
      state.events = [];
    },
  },
});

export const { addEvent, toggleLive, clearFeed } = activitySlice.actions;
export default activitySlice.reducer;