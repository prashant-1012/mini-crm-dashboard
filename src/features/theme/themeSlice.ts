import { createSlice } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
}

// Read saved preference from localStorage on app start.
// If nothing is saved yet, default to 'dark'.
const getSavedTheme = (): ThemeMode => {
  const saved = localStorage.getItem('crm-theme');
  return saved === 'light' ? 'light' : 'dark';
};

const initialState: ThemeState = {
  mode: getSavedTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      // Persist the new preference so it survives page refresh.
      localStorage.setItem('crm-theme', state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;