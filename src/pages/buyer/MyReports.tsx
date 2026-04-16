import { useState } from 'react';
import { Download, FileText, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function MyReports() {
  const { getMyPurchases, reports } = useApp();
  const myPurchases = getMyPurchases();
  const [downloading, setDownloading] = useState<string | null>(null);

  const purchasedReports = myPurchases.map((p) => ({
    purchase: p,
    report: reports.find((r) => r.id === p.reportId),
  })).filter((item) => item.report !== undefined);

  const handleDownload = (reportId: string) => {
    setDownloading(reportId);
    setTimeout(() => setDownloading(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Reports</h1>
        <p className="text-gray-500 text-sm mt-1">
          {purchasedReports.length} report{purchasedReports.length !== 1 ? 's' : ''} purchased
        </p>
      </div>

      {purchasedReports.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-700 mb-2">No reports purchased yet</h3>
          <p className="text-sm text-gray-400">Your purchased reports will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-5">
          {purchasedReports.map(({ purchase, report }) => (
            <div
              key={purchase.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 h-36 sm:h-auto overflow-hidden shrink-0">
                  <img
                    src={report!.image}
                    alt={report!.address}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                        {report!.propertyType}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mt-1">{report!.address}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {report!.city}, {report!.state}
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Purchased {purchase.purchasedAt}
                      </span>
                      <span className="font-semibold text-gray-700">${purchase.amount} paid</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Inspector: {report!.inspectorName}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDownload(report!.id)}
                    disabled={downloading === report!.id}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 shrink-0 ${
                      downloading === report!.id
                        ? 'bg-emerald-100 text-emerald-700 cursor-default'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-blue-200'
                    }`}
                  >
                    {downloading === report!.id ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Downloaded!
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download PDF
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
