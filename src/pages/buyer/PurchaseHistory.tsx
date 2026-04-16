import { Receipt, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function PurchaseHistory() {
  const { getMyPurchases, reports } = useApp();
  const myPurchases = getMyPurchases().slice().reverse();
  const totalSpent = myPurchases.length * 500;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Purchase History</h1>
        <p className="text-gray-500 text-sm mt-1">
          Complete record of all your transactions
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
            <Receipt className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{myPurchases.length}</p>
          <p className="text-sm text-gray-500 mt-1">Total Transactions</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">${totalSpent.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Total Amount Spent</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${myPurchases.length > 0 ? 500 : 0}
          </p>
          <p className="text-sm text-gray-500 mt-1">Avg. Per Report</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Transaction History</h2>
        </div>

        {myPurchases.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Receipt className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No purchases yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Transaction ID
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Property
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
                {myPurchases.map((purchase) => {
                  const report = reports.find((r) => r.id === purchase.reportId);
                  return (
                    <tr key={purchase.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          #{purchase.id.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {report?.address ?? 'Unknown'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {report?.city}, {report?.state}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {purchase.purchasedAt}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-bold text-gray-900">
                          ${purchase.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Completed
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
