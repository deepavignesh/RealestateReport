import { Link } from 'react-router-dom';
import { Plus, Download, DollarSign, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../../components/StatusBadge';

export default function InspectorReports() {
  const { getMyReports, purchases } = useApp();
  const myReports = getMyReports();

  const getReportSales = (reportId: string) =>
    purchases.filter((p) => p.reportId === reportId).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Reports</h1>
          <p className="text-gray-500 text-sm mt-1">
            {myReports.length} report{myReports.length !== 1 ? 's' : ''} submitted
          </p>
        </div>
        <Link
          to="/inspector/upload"
          className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Upload Report
        </Link>
      </div>

      {myReports.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-700 mb-2">No reports uploaded yet</h3>
          <p className="text-sm text-gray-400 mb-5">Upload your first report to start earning.</p>
          <Link
            to="/inspector/upload"
            className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Upload Report
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Property
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Type
                  </th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Status
                  </th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Downloads
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Earnings
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                    Uploaded
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {myReports.map((report) => {
                  const sales = getReportSales(report.id);
                  const earnings = sales * 450;
                  return (
                    <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={report.image}
                            alt={report.address}
                            className="w-10 h-10 rounded-lg object-cover shrink-0"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{report.address}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                              <MapPin className="w-3 h-3" />
                              {report.city}, {report.state}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                          {report.propertyType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <StatusBadge status={report.status} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 text-sm text-gray-700">
                          <Download className="w-3.5 h-3.5 text-gray-400" />
                          {report.downloads + sales}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-sm font-bold text-gray-900">{earnings}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{report.uploadedAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
