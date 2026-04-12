import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppShell = () => {
  return (
    // h-screen = poori screen ki height
    // overflow-hidden = bahar scroll nahi hoga
    <div className="flex h-screen overflow-hidden bg-gray-50">

      <Sidebar />

      {/* Right side — main content area */}
      <main className="flex-1 overflow-y-auto">
        {/* Yahan pe matched page render hoga */}
        <Outlet />
      </main>

    </div>
  );
};

export default AppShell;