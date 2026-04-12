import { useCampaigns } from '../features/campaigns/hooks/useCampaigns';
import CampaignBarChart from '../features/campaigns/components/CampaignBarChart';
import LeadSourceDonut from '../features/campaigns/components/LeadSourceDonut';
import LeadTrendLine from '../features/campaigns/components/LeadTrendLine';

const CampaignsPage = () => {
  const { campaigns, leadSources, leadTrend, isLoading, error } = useCampaigns();

  return (
    <div className="flex flex-col gap-6">

      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Campaign Analytics
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Performance breakdown across all your campaigns.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
          Failed to load campaign data: {error}
        </div>
      )}

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <CampaignBarChart
          data={campaigns}
          isLoading={isLoading}
        />

        <LeadSourceDonut
          data={leadSources}
          isLoading={isLoading}
        />

        {/* Line chart spans full width — defined via col-span-full in ChartCard */}
        <LeadTrendLine
          data={leadTrend}
          isLoading={isLoading}
        />

      </div>
    </div>
  );
};

export default CampaignsPage;