import type { LeadStatus } from '../../../types/api.types';

interface LeadStatusBadgeProps {
  status: LeadStatus;
}

// Record<LeadStatus, string> guarantees every possible status
// has a style defined. If you add a new status to LeadStatus
// but forget to add it here, TypeScript will error immediately.
const STATUS_STYLES: Record<LeadStatus, string> = {
  New:        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Contacted:  'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Converted:  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Lost:       'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const STATUS_DOTS: Record<LeadStatus, string> = {
  New:        'bg-blue-500',
  Contacted:  'bg-amber-500',
  Converted:  'bg-emerald-500',
  Lost:       'bg-red-500',
};

const LeadStatusBadge = ({ status }: LeadStatusBadgeProps) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOTS[status]}`} />
    {status}
  </span>
);

export default LeadStatusBadge;