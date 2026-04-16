import { Link } from 'react-router-dom';
import { FileText, ShoppingBag, DollarSign, ArrowRight, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../../components/StatusBadge';

export default function BuyerDashboard() {
  const { currentUser, getMyPurchases, reports } = useApp();
  const myPurchases = getMyPurchases();
  const recentPurchases = myPurchases.slice(-3).reverse();

  const totalSpent = myPurchases.length * 500;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {currentUser?.name?.split(' ')[0]}
        </h1>
        <p className="text-gray-500 text-sm mt-1">Here's an overview of your activity</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{myPurchases.length}</p>
          <p className="text-sm text-gray-500 mt-1">Reports Purchased</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">${totalSpent.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Total Invested</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {reports.filter((r) => r.status === 'approved').length}
          </p>
          <p className="text-sm text-gray-500 mt-1">Reports Available</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Recent Purchases</h2>
          <Link
            to="/buyer/reports"
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentPurchases.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">No reports yet</p>
            <p className="text-xs text-gray-400 mb-4">Browse the marketplace to find your first report</p>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Marketplace
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentPurchases.map((purchase) => {
              const report = reports.find((r) => r.id === purchase.reportId);
              if (!report) return null;
              return (
                <div key={purchase.id} className="p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <img
                    src={report.image}
                    alt={report.address}
                    className="w-14 h-14 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{report.address}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {report.city}, {report.state}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <StatusBadge status={report.status} />
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-gray-900">${purchase.amount}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {purchase.purchasedAt}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-7 text-white">
        <h3 className="text-lg font-bold mb-2">Find Your Next Property Report</h3>
        <p className="text-blue-100 text-sm mb-5">
          Thousands of verified reports available. Make confident investment decisions today.
        </p>
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 bg-white text-blue-700 text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Browse Reports <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
