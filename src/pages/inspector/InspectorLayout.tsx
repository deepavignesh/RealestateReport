import { Outlet, Navigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Upload, DollarSign } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { useApp } from '../../context/AppContext';

const navItems = [
  { label: 'Dashboard', path: '/inspector', icon: LayoutDashboard },
  { label: 'My Reports', path: '/inspector/reports', icon: FileText },
  { label: 'Upload Report', path: '/inspector/upload', icon: Upload },
  { label: 'Earnings', path: '/inspector/earnings', icon: DollarSign },
];

export default function InspectorLayout() {
  const { currentUser } = useApp();
  if (!currentUser || currentUser.role !== 'inspector') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar
          items={navItems}
          title="Inspector Portal"
          subtitle={currentUser.name}
        />
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
