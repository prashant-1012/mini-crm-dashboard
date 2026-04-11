import { Outlet } from 'react-router-dom';

// Outlet is React Router's way of saying "render the matched child route here"
// We'll replace this with a real Sidebar + Topbar in the next step
const AppShell = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar will go here */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;