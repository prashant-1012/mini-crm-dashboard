import { useLeads } from '../features/leads/hooks/useLeads';
import LeadsTable from '../features/leads/components/LeadsTable';
import LeadsToolbar from '../features/leads/components/LeadsToolbar';
import Pagination from '../components/ui/Pagination';
import PageWrapper from '../components/ui/PageWrapper';

const LeadsPage = () => {
  const {
    leads,
    totalLeads,
    status,
    error,
    searchQuery,
    statusFilter,
    currentPage,
    totalPages,
    pageSize,
    setSearchQuery,
    setStatusFilter,
    setCurrentPage,
  } = useLeads();

  const isLoading = status === 'idle' || status === 'loading';

  return (
    <PageWrapper>
    <div className="flex flex-col gap-6">

      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-y-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Leads
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            {isLoading ? 'Loading...' : `${totalLeads} leads total`}
          </p>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
          Failed to load leads: {error}
        </div>
      )}

      {/* Main card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-5">

        <LeadsToolbar
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          onSearchChange={setSearchQuery}
          onStatusChange={setStatusFilter}
        />

        <LeadsTable
          data={leads}
          isLoading={isLoading}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalLeads}
          pageSize={pageSize}
        />

      </div>
    </div>
    </PageWrapper>
  );
};

export default LeadsPage;