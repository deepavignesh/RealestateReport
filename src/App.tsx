import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Marketplace from './pages/Marketplace';
import ReportDetail from './pages/ReportDetail';
import PurchaseSuccess from './pages/PurchaseSuccess';

import BuyerLayout from './pages/buyer/BuyerLayout';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import MyReports from './pages/buyer/MyReports';
import PurchaseHistory from './pages/buyer/PurchaseHistory';

import InspectorLayout from './pages/inspector/InspectorLayout';
import InspectorDashboard from './pages/inspector/InspectorDashboard';
import InspectorReports from './pages/inspector/InspectorReports';
import UploadReport from './pages/inspector/UploadReport';
import Earnings from './pages/inspector/Earnings';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ReportApproval from './pages/admin/ReportApproval';
import AdminUsers from './pages/admin/AdminUsers';
import AdminTransactions from './pages/admin/AdminTransactions';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:id" element={<ReportDetail />} />
          <Route path="/purchase-success" element={<PurchaseSuccess />} />

          <Route path="/buyer" element={<BuyerLayout />}>
            <Route index element={<BuyerDashboard />} />
            <Route path="reports" element={<MyReports />} />
            <Route path="history" element={<PurchaseHistory />} />
          </Route>

          <Route path="/inspector" element={<InspectorLayout />}>
            <Route index element={<InspectorDashboard />} />
            <Route path="reports" element={<InspectorReports />} />
            <Route path="upload" element={<UploadReport />} />
            <Route path="earnings" element={<Earnings />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="reports" element={<ReportApproval />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="transactions" element={<AdminTransactions />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
