import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchKpis } from '../overviewSlice';


// This hook owns all the data-fetching logic for the overview page.
// The page component just calls useOverview() and gets clean data back.
// No Redux imports needed in the page itself.
export const useOverview = () => {
  const dispatch = useAppDispatch();

  const kpis = useAppSelector((state) => state.overview.kpis);
  const status = useAppSelector((state) => state.overview.status);
  const error = useAppSelector((state) => state.overview.error);

  useEffect(() => {
    // Only fetch if we haven't fetched yet.
    // Prevents duplicate API calls on re-renders.
    if (status === 'idle') {
      dispatch(fetchKpis());
    }
  }, [status, dispatch]);

  return { kpis, status, error };
};