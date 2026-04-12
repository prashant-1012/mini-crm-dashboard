import { useOverview } from '../features/overview/hooks/useOverview';
import KpiCard from '../features/overview/components/KpiCard';
import { KpiCardSkeleton } from '../components/ui/Skeleton';

const DashboardPage = () => {
  const { kpis, status, error } = useOverview();
  const isLoading = status === 'idle' || status === 'loading';

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Good morning, Prashant 👋
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Here's what's happening with your CRM today.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
          Failed to load KPIs: {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <KpiCardSkeleton key={i} />)
          : kpis.map((kpi) => <KpiCard key={kpi.id} data={kpi} />)
        }
      </div>
    </div>
  );
};

export default DashboardPage;