import type { LeadStatus } from '../../../types/api.types';

interface LeadsToolbarProps {
  searchQuery: string;
  statusFilter: LeadStatus | 'All';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: LeadStatus | 'All') => void;
}

const STATUS_OPTIONS: Array<LeadStatus | 'All'> = [
  'All', 'New', 'Contacted', 'Converted', 'Lost'
];

const LeadsToolbar = ({
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: LeadsToolbarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">

      {/* Search input */}
      <div className="relative flex-1">
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
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
      </div>

      {/* Status filter dropdown */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value as LeadStatus | 'All')}
        className="px-4 py-2.5 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer"
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option === 'All' ? 'All Statuses' : option}
          </option>
        ))}
      </select>

    </div>
  );
};

export default LeadsToolbar;