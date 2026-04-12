import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchCampaignData } from '../campaignsSlice';

export const useCampaigns = () => {
  const dispatch = useAppDispatch();
  const { campaigns, leadSources, leadTrend, status, error } =
    useAppSelector((state) => state.campaigns);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCampaignData());
    }
  }, [status, dispatch]);

  const isLoading = status === 'idle' || status === 'loading';

  return { campaigns, leadSources, leadTrend, isLoading, error };
};