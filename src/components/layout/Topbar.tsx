import { useLocation } from 'react-router-dom';
import type { TopbarProps } from './Topbar.types';

// Maps URL paths to human-readable page titles.
// Record<string, string> means: an object where both keys
// and values are strings. TypeScript will error if you
// accidentally put a number as a value.
const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/leads':     'Leads Management',
  '/campaigns': 'Campaign Analytics',
  '/activity':  'Activity Feed',
};

const Topbar = ({ title }: TopbarProps) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">

      {/* Left — page title */}
      <h1 className="text-lg font-semibold text-gray-800">
        {title}
      </h1>

      {/* Right — actions */}
      <div className="flex items-center gap-4">

        {/* Notification bell */}
        <button
          className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Notifications"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            width={20}
            height={20}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>

          {/* Notification dot — shows there are unread notifications */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200" />

        {/* Avatar */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            PK
          </div>
          <span className="text-sm font-medium text-gray-700">
            Prashant
          </span>
        </div>

      </div>
    </header>
  );
};

// We export a wrapper that reads the current route and
// passes the correct title down — keeps Topbar itself simple and reusable.
export const TopbarWithTitle = () => {
  const location = useLocation();

  const title = PAGE_TITLES[location.pathname] ?? 'CRM Dashboard';

  return <Topbar title={title} />;
};

export default Topbar;