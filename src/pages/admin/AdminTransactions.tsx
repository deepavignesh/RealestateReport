import { DollarSign, TrendingUp, ShoppingCart, Receipt, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminTransactions() {
  const { purchases, reports, users } = useApp();

  const totalRevenue = purchases.length * 500;
  const platformRevenue = purchases.length * 50;
  const inspectorPayouts = purchases.length * 450;

  const enriched = purchases.map((p) => ({
    ...p,
    report: reports.find((r) => r.id === p.reportId),
    buyer: users.find((u) => u.id === p.buyerId),
  })).reverse();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-500 text-sm mt-1">Complete record of all platform transactions</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{purchases.length}</p>
          <p className="text-sm text-gray-500 mt-1">Total Transactions</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Gross Revenue</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${platformRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Platform Revenue</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <Receipt className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${inspectorPayouts.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Inspector Payouts</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Transaction History</h2>
        </div>

        {enriched.length === 0 ? (
          <div className="p-12 text-center">
            <Receipt className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No transactions yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Transaction
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Property
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Buyer
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Inspector
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Date
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Amount
                  </th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {enriched.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        #{tx.id.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {tx.report?.address ?? 'N/A'}
                        </p>
                        <p className="text-xs text-gray-400">
                          {tx.report?.city}, {tx.report?.state}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">{tx.buyer?.name ?? 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">{tx.report?.inspectorName ?? 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {tx.purchasedAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-bold text-gray-900">${tx.amount}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <p className="text-xs text-gray-400">{purchases.length} transactions total</p>
          <p className="text-xs text-gray-500 font-medium">
            Net revenue: <span className="text-gray-900">${platformRevenue.toLocaleString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
