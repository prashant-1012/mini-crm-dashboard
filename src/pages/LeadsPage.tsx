import { useState } from 'react';
import { useLeads } from '../features/leads/hooks/useLeads';
import LeadsTable from '../features/leads/components/LeadsTable';
import LeadsToolbar from '../features/leads/components/LeadsToolbar';
import AddEditLeadDrawer from '../features/leads/components/AddEditLeadDrawer';
import Pagination from '../components/ui/Pagination';
import PageWrapper from '../components/ui/PageWrapper';
import type { Lead } from '../features/leads/leadsTypes';

const LeadsPage = () => {
  const {
    leads,
    totalLeads,
    status,
    error,
    searchQuery,
    statusFilter,
    sourceFilter,
    assignedToFilter,
    currentPage,
    totalPages,
    pageSize,
    setSearchQuery,
    setStatusFilter,
    setSourceFilter,
    setAssignedToFilter,
    setCurrentPage,
    addLead,
    updateLead,
    deleteLead,
  } = useLeads();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const isLoading = status === 'idle' || status === 'loading';

  const handleAddClick = () => {
    setEditingLead(null);
    setIsDrawerOpen(true);
  };

  const handleEditClick = (lead: Lead) => {
    setEditingLead(lead);
    setIsDrawerOpen(true);
  };

  const handleDrawerSubmit = (lead: Lead) => {
    if (editingLead) {
      updateLead(lead);
    } else {
      addLead(lead);
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">

        {/* Page header */}
        <div className="flex items-center justify-between flex-wrap gap-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Leads
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              {isLoading ? 'Loading...' : `${totalLeads} leads total`}
            </p>
          </div>

          <button
            onClick={handleAddClick}
            title="Add new lead"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-95 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 transition-transform group-hover:rotate-90"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Add Lead</span>
          </button>
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
            sourceFilter={sourceFilter}
            assignedToFilter={assignedToFilter}
            onSearchChange={setSearchQuery}
            onStatusChange={setStatusFilter}
            onSourceChange={setSourceFilter}
            onAssignedToChange={setAssignedToFilter}
          />

          <LeadsTable
            data={leads}
            isLoading={isLoading}
            onEdit={handleEditClick}
            onDelete={deleteLead}
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

      <AddEditLeadDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleDrawerSubmit}
        initialData={editingLead}
      />
    </PageWrapper>
  );
};

export default LeadsPage;