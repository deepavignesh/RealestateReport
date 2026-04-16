import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const dashboardLink = () => {
    if (!currentUser) return '/login';
    if (currentUser.role === 'buyer') return '/buyer';
    if (currentUser.role === 'inspector') return '/inspector';
    if (currentUser.role === 'admin') return '/admin';
    return '/';
  };

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">
              Sure<span className="text-blue-600">Report</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                <Link
                  to={dashboardLink()}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">{currentUser.name}</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full capitalize">
                    {currentUser.role}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/marketplace"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors px-3 py-2"
                >
                  Marketplace
                </Link>
                <Link
                  to="/login"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
