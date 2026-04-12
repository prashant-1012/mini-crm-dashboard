import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import DashboardPage from '../pages/DashboardPage';
import LeadsPage from '../pages/LeadsPage';
import CampaignsPage from '../pages/CampaignsPage';
import ActivityPage from '../pages/ActivityPage';
import NotFoundPage from '../pages/NotFoundPage';


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
        {/* Catches any URL that didn't match above */}
      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;