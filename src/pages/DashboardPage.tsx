import { useOverview } from '../features/overview/hooks/useOverview';
import { useCampaigns } from '../features/campaigns/hooks/useCampaigns';
import KpiCard from '../features/overview/components/KpiCard';
import { KpiCardSkeleton } from '../components/ui/Skeleton';
import CampaignBarChart from '../features/campaigns/components/CampaignBarChart';
import LeadSourceDonut from '../features/campaigns/components/LeadSourceDonut';
import PageWrapper from '../components/ui/PageWrapper';

const DashboardPage = () => {
  const { kpis, status: kpiStatus, error: kpiError } = useOverview();
  const { campaigns, leadSources, isLoading: chartsLoading } = useCampaigns();

  const kpiLoading = kpiStatus === 'idle' || kpiStatus === 'loading';

  return (
    <PageWrapper>
    <div className="flex flex-col gap-8">

      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Good morning, Prashant 👋
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Here's what's happening with your CRM today.
        </p>
      </div>

      {/* KPI error */}
      {kpiError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
          Failed to load KPIs: {kpiError}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiLoading
          ? Array.from({ length: 4 }).map((_, i) => <KpiCardSkeleton key={i} />)
          : kpis.map((kpi) => <KpiCard key={kpi.id} data={kpi} />)
        }
      </div>

      {/* Charts preview row */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
          Campaign Overview
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CampaignBarChart data={campaigns} isLoading={chartsLoading} />
          <LeadSourceDonut  data={leadSources} isLoading={chartsLoading} />
        </div>
      </div>

    </div>
    </PageWrapper>
  );
};

export default DashboardPage;