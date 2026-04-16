import { Link } from 'react-router-dom';
import {
  FileText,
  Users,
  DollarSign,
  Clock,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../../components/StatusBadge';

export default function AdminDashboard() {
  const { reports, users, purchases } = useApp();

  const pendingReports = reports.filter((r) => r.status === 'pending');
  const approvedReports = reports.filter((r) => r.status === 'approved');
  const totalRevenue = purchases.length * 500;
  const totalBuyers = users.filter((u) => u.role === 'buyer').length;
  const totalInspectors = users.filter((u) => u.role === 'inspector').length;

  const recentPending = pendingReports.slice(0, 4);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Platform overview and management</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
          <p className="text-sm text-gray-500 mt-1">Total Reports</p>
          <p className="text-xs text-blue-600 mt-1">{approvedReports.length} approved</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{pendingReports.length}</p>
          <p className="text-sm text-gray-500 mt-1">Pending Approval</p>
          {pendingReports.length > 0 && (
            <p className="text-xs text-amber-600 mt-1">Action required</p>
          )}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
            <Users className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
          <p className="text-sm text-gray-500 mt-1">Total Users</p>
          <p className="text-xs text-gray-400 mt-1">
            {totalBuyers} buyers · {totalInspectors} inspectors
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Total Revenue</p>
          <p className="text-xs text-emerald-600 mt-1">{purchases.length} transactions</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Pending Approvals</h2>
              {pendingReports.length > 0 && (
                <p className="text-xs text-amber-600 mt-0.5">
                  {pendingReports.length} report{pendingReports.length !== 1 ? 's' : ''} awaiting review
                </p>
              )}
            </div>
            <Link
              to="/admin/reports"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Manage all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentPending.length === 0 ? (
            <div className="p-10 text-center">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-sm font-medium text-gray-600">All caught up!</p>
              <p className="text-xs text-gray-400 mt-1">No reports pending approval.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentPending.map((r) => (
                <div key={r.id} className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors">
                  <img
                    src={r.image}
                    alt={r.address}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{r.address}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {r.city}, {r.state} · {r.inspectorName}
                    </p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Platform Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-500">Approval Rate</span>
                  <span className="font-semibold text-gray-900">
                    {reports.length > 0
                      ? Math.round((approvedReports.length / reports.length) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{
                      width: reports.length > 0
                        ? `${(approvedReports.length / reports.length) * 100}%`
                        : '0%',
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-500">Sales Rate</span>
                  <span className="font-semibold text-gray-900">
                    {approvedReports.length > 0
                      ? Math.round((purchases.length / approvedReports.length) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{
                      width: approvedReports.length > 0
                        ? `${Math.min((purchases.length / approvedReports.length) * 100, 100)}%`
                        : '0%',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">User Breakdown</h3>
            <div className="space-y-3">
              {[
                { label: 'Buyers', count: totalBuyers, color: 'bg-blue-500' },
                { label: 'Inspectors', count: totalInspectors, color: 'bg-emerald-500' },
                { label: 'Admins', count: users.filter((u) => u.role === 'admin').length, color: 'bg-amber-500' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-gray-700">Platform Revenue</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">${(purchases.length * 50).toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">After inspector payouts</p>
          </div>
        </div>
      </div>
    </div>
  );
}
