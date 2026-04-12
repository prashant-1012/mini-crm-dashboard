import { configureStore } from '@reduxjs/toolkit';
import overviewReducer from '../features/overview/overviewSlice';
import themeReducer from '../features/theme/themeSlice';
import leadsReducer from '../features/leads/leadsSlice';

export const store = configureStore({
  reducer: {
    overview: overviewReducer,
    theme: themeReducer,
    leads: leadsReducer,
  },
});

// TypeScript: derive these types from the store itself.
// This means they stay in sync automatically as we add reducers —
// we never have to manually update them.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;