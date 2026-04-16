import { Link } from 'react-router-dom';
import { FileText, DollarSign, TrendingUp, Upload, ArrowRight, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../../components/StatusBadge';

export default function InspectorDashboard() {
  const { currentUser, getMyReports, purchases } = useApp();
  const myReports = getMyReports();
  const approvedReports = myReports.filter((r) => r.status === 'approved');
  const pendingReports = myReports.filter((r) => r.status === 'pending');

  const soldReports = approvedReports.filter((r) =>
    purchases.some((p) => p.reportId === r.id)
  );
  const totalEarnings = soldReports.reduce(
    (sum, r) => sum + purchases.filter((p) => p.reportId === r.id).length * 450,
    0
  );

  const recentReports = myReports.slice(-4).reverse();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {currentUser?.name?.split(' ')[0]}
        </h1>
        <p className="text-gray-500 text-sm mt-1">Here's your inspection activity overview</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{myReports.length}</p>
          <p className="text-sm text-gray-500 mt-1">Total Reports</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{pendingReports.length}</p>
          <p className="text-sm text-gray-500 mt-1">Pending Approval</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{soldReports.length}</p>
          <p className="text-sm text-gray-500 mt-1">Reports Sold</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${totalEarnings.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Total Earnings</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Recent Reports</h2>
            <Link
              to="/inspector/reports"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {recentReports.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-gray-400">No reports uploaded yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentReports.map((r) => (
                <div key={r.id} className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors">
                  <img
                    src={r.image}
                    alt={r.address}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{r.address}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{r.city}, {r.state}</p>
                  </div>
                  <div className="shrink-0">
                    <StatusBadge status={r.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
            <Upload className="w-8 h-8 text-blue-200 mb-4" />
            <h3 className="text-base font-bold mb-2">Upload New Report</h3>
            <p className="text-sm text-blue-100 mb-4">
              Earn $450 per report sold in the marketplace.
            </p>
            <Link
              to="/inspector/upload"
              className="inline-flex items-center gap-2 bg-white text-blue-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Upload Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Report Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Approved</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: myReports.length > 0 ? `${(approvedReports.length / myReports.length) * 100}%` : '0%' }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{approvedReports.length}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Pending</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: myReports.length > 0 ? `${(pendingReports.length / myReports.length) * 100}%` : '0%' }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{pendingReports.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
