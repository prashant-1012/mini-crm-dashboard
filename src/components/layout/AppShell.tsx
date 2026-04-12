import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { TopbarWithTitle } from './Topbar';

const AppShell = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopbarWithTitle />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppShell;