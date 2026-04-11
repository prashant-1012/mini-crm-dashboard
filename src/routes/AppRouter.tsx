import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import DashboardPage from '../pages/DashboardPage';
import LeadsPage from '../pages/LeadsPage';
import CampaignsPage from '../pages/CampaignsPage';
import ActivityPage from '../pages/ActivityPage';


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          {/* index route = default child when path is exactly "/" */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="activity" element={<ActivityPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;