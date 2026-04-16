import { Outlet, Navigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, CreditCard } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { useApp } from '../../context/AppContext';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Reports', path: '/admin/reports', icon: FileText },
  { label: 'Users', path: '/admin/users', icon: Users },
  { label: 'Transactions', path: '/admin/transactions', icon: CreditCard },
];

export default function AdminLayout() {
  const { currentUser } = useApp();
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar
          items={navItems}
          title="Admin Panel"
          subtitle={currentUser.name}
        />
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
