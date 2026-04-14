import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import type { NavItem } from './Sidebar.types';
import {
  DashboardIcon,
  LeadsIcon,
  CampaignsIcon,
  ActivityIcon,
  ChevronLeftIcon,
  MenuIcon,
} from '../ui/Icons';

interface SidebarProps {
  /** Called when a nav link is clicked — used by AppShell to close the mobile drawer. */
  onClose?: () => void;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Leads',     path: '/leads',     icon: <LeadsIcon /> },
  { label: 'Campaigns', path: '/campaigns', icon: <CampaignsIcon /> },
  { label: 'Activity',  path: '/activity',  icon: <ActivityIcon /> },
];

const Sidebar = ({ onClose }: SidebarProps) => {
  // Collapse state only affects desktop — on mobile the sidebar is a full-width drawer
  const [collapsed, setCollapsed] = useState(false);
  const totalLeads = useAppSelector((state) => state.leads.leads.length);

  return (
    <aside
      className={[
        // Layout
        'h-full flex flex-col flex-shrink-0',
        // Colors & border
        'bg-gray-900 dark:bg-gray-950',
        'border-r border-gray-700 dark:border-gray-800',
        // Width: always full on mobile; follow collapse on desktop only
        'w-64',
        collapsed ? 'lg:w-16' : '',
        // Smooth transition
        'transition-all duration-300 ease-in-out',
      ].join(' ')}
    >
      {/* ── Logo + Desktop collapse toggle ─────────────────────── */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700 dark:border-gray-800 flex-shrink-0">

        {/* Logo — hidden only on desktop when collapsed */}
        <span
          className={[
            'text-white font-bold text-lg tracking-tight whitespace-nowrap overflow-hidden',
            'transition-all duration-200',
            collapsed ? 'lg:w-0 lg:opacity-0' : 'opacity-100',
          ].join(' ')}
        >
          ⚡ MiniCRM
        </span>

        {/* Collapse toggle — desktop only (hidden on mobile) */}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className={[
            'hidden lg:flex p-1.5 rounded-md text-gray-400 flex-shrink-0',
            'hover:text-white hover:bg-gray-700 transition-colors',
            collapsed ? 'lg:mx-auto' : '',
          ].join(' ')}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </button>
      </div>

      {/* ── Nav links ──────────────────────────────────────────── */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-hidden">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}              // auto-close mobile drawer on navigate
            title={collapsed ? item.label : undefined}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150',
                collapsed ? 'lg:justify-center' : '',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
              ].join(' ')
            }
          >
            {/* Icon — always visible */}
            <span className="flex-shrink-0">{item.icon}</span>

            {/* Label — hidden on desktop when collapsed */}
            <span
              className={[
                'flex-1 whitespace-nowrap overflow-hidden transition-all duration-200',
                collapsed ? 'lg:w-0 lg:opacity-0 lg:max-w-0' : 'opacity-100 max-w-xs',
              ].join(' ')}
            >
              {item.label}
            </span>

            {/* Leads count badge — hidden in desktop collapsed mode */}
            {item.path === '/leads' && totalLeads > 0 && (
              <span
                className={[
                  'bg-blue-500/20 text-blue-300 text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0',
                  collapsed ? 'lg:hidden' : '',
                ].join(' ')}
              >
                {totalLeads}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── User profile ──────────────────────────────────────── */}
      <div className="p-3 border-t border-gray-700 dark:border-gray-800 flex-shrink-0">
        <div
          className={[
            'flex items-center gap-3 px-1 overflow-hidden',
            collapsed ? 'lg:justify-center' : '',
          ].join(' ')}
        >
          {/* Avatar — always visible */}
          <div
            className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            title={collapsed ? 'Prashant Kumar · Admin' : undefined}
          >
            PK
          </div>

          {/* Name + role — hidden on desktop when collapsed */}
          <div
            className={[
              'flex flex-col min-w-0 transition-all duration-200',
              collapsed ? 'lg:w-0 lg:opacity-0 lg:overflow-hidden' : 'opacity-100',
            ].join(' ')}
          >
            <span className="text-white text-sm font-medium truncate">Prashant Kumar</span>
            <span className="text-gray-400 text-xs truncate">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;