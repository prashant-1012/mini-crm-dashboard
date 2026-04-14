import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { TopbarWithTitle } from './Topbar';

const AppShell = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">

      {/* Mobile backdrop — darkens content when drawer is open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/*
        Sidebar wrapper
        ─ Mobile  : fixed slide-in drawer (z-50, transform-based show/hide)
        ─ Desktop : static left column back in normal flow (lg:static + lg:translate-x-0)
      */}
      <div
        className={[
          'fixed inset-y-0 left-0 z-50 flex-shrink-0',
          'lg:static lg:z-auto',
          'transition-transform duration-300 ease-in-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0',
        ].join(' ')}
      >
        <Sidebar onClose={() => setMobileOpen(false)} />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopbarWithTitle onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AppShell;