import { configureStore } from '@reduxjs/toolkit';

// We'll add slice reducers here as we build each feature
export const store = configureStore({
  reducer: {
    // leads: leadsReducer,   ← we'll uncomment these as we build
    // campaigns: campaignsReducer,
  },
});

// TypeScript: derive these types from the store itself.
// This means they stay in sync automatically as we add reducers —
// we never have to manually update them.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;