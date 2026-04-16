import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Video as LucideIcon } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

interface SidebarProps {
  items: NavItem[];
  title: string;
  subtitle: string;
}

export default function Sidebar({ items, title, subtitle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-base font-bold text-gray-900">
            Sure<span className="text-blue-600">Report</span>
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-3">{title}</p>
          <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
