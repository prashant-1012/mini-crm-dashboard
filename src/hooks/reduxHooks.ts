import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';

// TypeScript note: these are "typed wrappers" around the generic RTK hooks.
// useAppSelector knows the shape of your entire Redux state.
// useAppDispatch knows which action types are valid.
// Use THESE instead of the raw hooks everywhere in your app.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector);