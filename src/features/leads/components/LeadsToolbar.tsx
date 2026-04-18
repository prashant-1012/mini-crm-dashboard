import type { LeadStatus } from '../../../types/api.types';

interface LeadsToolbarProps {
  searchQuery: string;
  statusFilter: LeadStatus | 'All';
  sourceFilter: string;
  assignedToFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: LeadStatus | 'All') => void;
  onSourceChange: (value: string) => void;
  onAssignedToChange: (value: string) => void;
}

const STATUS_OPTIONS: Array<LeadStatus | 'All'> = [
  'All', 'New', 'Contacted', 'Converted', 'Lost'
];

const SOURCE_OPTIONS = ['All', 'Website', 'Referral', 'LinkedIn', 'Email Campaign', 'Cold Call'];
const ASSIGNEE_OPTIONS = ['All', 'Prashant Kumar', 'Sneha Joshi', 'Rahul Singh'];

const LeadsToolbar = ({
  searchQuery,
  statusFilter,
  sourceFilter,
  assignedToFilter,
  onSearchChange,
  onStatusChange,
  onSourceChange,
  onAssignedToChange,
}: LeadsToolbarProps) => {
  const hasFilters = statusFilter !== 'All' || sourceFilter !== 'All' || assignedToFilter !== 'All';

  const clearFilters = () => {
    onStatusChange('All');
    onSourceChange('All');
    onAssignedToChange('All');
  };

  return (
    <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center">

      {/* Search input */}
      <div className="relative flex-1 min-w-[240px] w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width={16}
          height={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-10 py-2.5 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            title="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as LeadStatus | 'All')}
          className="px-3 py-2.5 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option === 'All' ? 'All Statuses' : option}
            </option>
          ))}
        </select>

        {/* Source filter */}
        <select
          value={sourceFilter}
          onChange={(e) => onSourceChange(e.target.value)}
          className="px-3 py-2.5 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer"
        >
          {SOURCE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option === 'All' ? 'All Sources' : option}
            </option>
          ))}
        </select>

        {/* Assigned To filter */}
        <select
          value={assignedToFilter}
          onChange={(e) => onAssignedToChange(e.target.value)}
          className="px-3 py-2.5 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer"
        >
          {ASSIGNEE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option === 'All' ? 'All Assignees' : option}
            </option>
          ))}
        </select>

        {/* Clear Filters Button */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-800/50 ml-auto xl:ml-0"
            title="Reset all filters"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <span className="hidden sm:inline">Reset Filters</span>
          </button>
        )}
      </div>

    </div>
  );
};

export default LeadsToolbar;