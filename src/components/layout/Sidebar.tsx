import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import type { NavItem } from './Sidebar.types';
import { DashboardIcon, LeadsIcon, CampaignsIcon, ActivityIcon } from '../ui/Icons';

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Leads',     path: '/leads',     icon: <LeadsIcon /> },
  { label: 'Campaigns', path: '/campaigns', icon: <CampaignsIcon /> },
  { label: 'Activity',  path: '/activity',  icon: <ActivityIcon /> },
];

const Sidebar = () => {
  const totalLeads = useAppSelector((state) => state.leads.leads.length);

  return (
    <aside className="w-64 h-screen bg-gray-900 dark:bg-gray-950 flex flex-col flex-shrink-0 border-r border-gray-700 dark:border-gray-800">

      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-700 dark:border-gray-800">
        <span className="text-white font-bold text-lg tracking-tight">
          ⚡ MiniCRM
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
              ].join(' ')
            }
          >
            {item.icon}
            <span className="flex-1">{item.label}</span>

            {/* Show lead count badge only on the Leads link */}
            {item.path === '/leads' && totalLeads > 0 && (
              <span className="bg-blue-500/20 text-blue-300 text-xs font-semibold px-2 py-0.5 rounded-full">
                {totalLeads}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-gray-700 dark:border-gray-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            PK
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white text-sm font-medium truncate">
              Prashant Kumar
            </span>
            <span className="text-gray-400 text-xs truncate">Admin</span>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;