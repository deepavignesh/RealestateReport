import { useState } from 'react';
import { Users, UserCheck, Wrench, Shield, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../data/mockData';

const ROLE_FILTERS: { label: string; value: UserRole | 'all' }[] = [
  { label: 'All Users', value: 'all' },
  { label: 'Buyers', value: 'buyer' },
  { label: 'Inspectors', value: 'inspector' },
  { label: 'Admins', value: 'admin' },
];

const roleIcons: Record<UserRole, React.FC<{ className?: string }>> = {
  buyer: UserCheck,
  inspector: Wrench,
  admin: Shield,
};

const roleColors: Record<UserRole, string> = {
  buyer: 'bg-blue-50 text-blue-700',
  inspector: 'bg-emerald-50 text-emerald-700',
  admin: 'bg-amber-50 text-amber-700',
};

export default function AdminUsers() {
  const { users } = useApp();
  const [filter, setFilter] = useState<UserRole | 'all'>('all');

  const filtered = filter === 'all' ? users : users.filter((u) => u.role === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-500 text-sm mt-1">Manage all platform users</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Buyers', count: users.filter((u) => u.role === 'buyer').length, icon: UserCheck, color: 'bg-blue-50 text-blue-600' },
          { label: 'Inspectors', count: users.filter((u) => u.role === 'inspector').length, icon: Wrench, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Admins', count: users.filter((u) => u.role === 'admin').length, icon: Shield, color: 'bg-amber-50 text-amber-600' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{item.count}</p>
                <p className="text-xs text-gray-500">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 flex-wrap">
        {ROLE_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
              filter === f.value
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">User</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Email</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Role</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Joined</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((user) => {
                const Icon = roleIcons[user.role];
                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-sm font-bold shrink-0">
                          {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${roleColors[user.role]}`}>
                        <Icon className="w-3 h-3" />
                        <span className="capitalize">{user.role}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {user.joinedAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Active
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Showing {filtered.length} of {users.length} users
          </p>
        </div>
      </div>
    </div>
  );
}
