import { NavLink } from 'react-router-dom';
import type { NavItem } from './Sidebar.types';
import {
  DashboardIcon,
  LeadsIcon,
  CampaignsIcon,
  ActivityIcon,
} from '../ui/Icons';


// Yeh array define karta hai sidebar ke saare links.
// NavItem[] matlab — "yeh ek array hai jisme sirf NavItem type ki
// cheezein ho sakti hain." Agar tum galti se `path` bhool gaye
// toh TypeScript turant error dega.
const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Leads',     path: '/leads',     icon: <LeadsIcon /> },
  { label: 'Campaigns', path: '/campaigns', icon: <CampaignsIcon /> },
  { label: 'Activity',  path: '/activity',  icon: <ActivityIcon /> },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 flex flex-col flex-shrink-0">

      {/* Logo area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-700">
        <span className="text-white font-bold text-lg tracking-tight">
          ⚡ MiniCRM
        </span>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              // isActive = React Router automatically detect karta hai
              // ki current URL is link ke path se match karti hai ya nahi
              [
                'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150',
                isActive
                  ? 'bg-blue-600 text-white'           // active link style
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white', // inactive
              ].join(' ')
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom user section */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3 px-2">
          {/* Avatar placeholder */}
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            PK
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white text-sm font-medium truncate">
              Prashant Kumar
            </span>
            <span className="text-gray-400 text-xs truncate">
              Admin
            </span>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;