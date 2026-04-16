import { Outlet, Navigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Receipt, ShoppingBag } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { useApp } from '../../context/AppContext';

const navItems = [
  { label: 'Dashboard', path: '/buyer', icon: LayoutDashboard },
  { label: 'My Reports', path: '/buyer/reports', icon: FileText },
  { label: 'Purchase History', path: '/buyer/history', icon: Receipt },
  { label: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
];

export default function BuyerLayout() {
  const { currentUser } = useApp();
  if (!currentUser || currentUser.role !== 'buyer') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar
          items={navItems}
          title="Buyer Portal"
          subtitle={currentUser.name}
        />
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
