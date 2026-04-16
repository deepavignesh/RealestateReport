import { DollarSign, TrendingUp, FileText, ShoppingCart, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Earnings() {
  const { getMyReports, purchases } = useApp();
  const myReports = getMyReports();
  const approvedReports = myReports.filter((r) => r.status === 'approved');

  const totalSales = myReports.reduce(
    (sum, r) => sum + purchases.filter((p) => p.reportId === r.id).length,
    0
  );
  const totalEarnings = totalSales * 450;
  const avgPerReport = approvedReports.length > 0 ? Math.round(totalEarnings / approvedReports.length) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
        <p className="text-gray-500 text-sm mt-1">
          You earn $450 per report sold (platform fee: $50)
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${totalEarnings.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Total Earnings</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalSales}</p>
          <p className="text-sm text-gray-500 mt-1">Total Sales</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{approvedReports.length}</p>
          <p className="text-sm text-gray-500 mt-1">Active Reports</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${avgPerReport.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Avg. Earnings/Report</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
          <h2 className="text-base font-semibold text-gray-900 mb-6">Earnings Breakdown</h2>
          <div className="space-y-4">
            {approvedReports.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">
                No approved reports yet. Upload and get approved to start earning.
              </p>
            ) : (
              approvedReports.map((r) => {
                const sales = purchases.filter((p) => p.reportId === r.id).length;
                const earned = sales * 450;
                return (
                  <div key={r.id} className="flex items-center gap-4">
                    <img
                      src={r.image}
                      alt={r.address}
                      className="w-10 h-10 object-cover rounded-lg shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{r.address}</p>
                      <p className="text-xs text-gray-400">{sales} sale{sales !== 1 ? 's' : ''}</p>
                    </div>
                    <span className="text-sm font-bold text-emerald-600 shrink-0">
                      ${earned.toLocaleString()}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-7 text-white">
            <Award className="w-8 h-8 text-emerald-200 mb-4" />
            <h3 className="text-lg font-bold mb-1">Payout Summary</h3>
            <p className="text-emerald-100 text-sm mb-5">
              Earnings are processed every Friday.
            </p>
            <div className="bg-white/10 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-emerald-100">Gross Revenue</span>
                <span className="font-semibold">${(totalSales * 500).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-100">Platform Fee (10%)</span>
                <span className="font-semibold">-${(totalSales * 50).toLocaleString()}</span>
              </div>
              <div className="border-t border-white/20 pt-2 flex justify-between text-sm">
                <span className="font-bold text-white">Your Earnings</span>
                <span className="font-bold">${totalEarnings.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Pricing Structure</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Report sale price</span>
                <span className="font-semibold text-gray-900">$500</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Platform commission</span>
                <span className="font-semibold text-gray-900">$50 (10%)</span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-100 pt-2">
                <span className="font-semibold text-gray-700">You receive</span>
                <span className="font-bold text-emerald-600">$450</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
