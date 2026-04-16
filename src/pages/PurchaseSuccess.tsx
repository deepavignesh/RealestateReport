import { useNavigate } from 'react-router-dom';
import { CheckCircle, Download, ArrowRight, FileText } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function PurchaseSuccess() {
  const navigate = useNavigate();
  const { reports, lastPurchasedReportId } = useApp();
  const report = reports.find((r) => r.id === lastPurchasedReportId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-lg mx-auto px-4 py-20">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Report Purchased Successfully!</h1>
          <p className="text-gray-500 text-sm mb-8">
            Your report is now available in your dashboard. You can download it at any time.
          </p>

          {report && (
            <div className="bg-gray-50 rounded-xl p-5 mb-8 text-left">
              <div className="flex items-start gap-4">
                <img
                  src={report.image}
                  alt={report.address}
                  className="w-16 h-16 object-cover rounded-lg shrink-0"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{report.address}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {report.city}, {report.state}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                      {report.propertyType}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600">${report.price} paid</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <FileText className="w-6 h-6 text-blue-600 mx-auto mb-1.5" />
              <p className="text-xs font-semibold text-blue-700">Full Report</p>
              <p className="text-xs text-blue-500">30+ pages</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <Download className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" />
              <p className="text-xs font-semibold text-emerald-700">Instant Download</p>
              <p className="text-xs text-emerald-500">Available now</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/buyer/reports')}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Go to My Reports
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/marketplace')}
              className="w-full py-3 px-4 bg-white text-gray-600 rounded-xl font-semibold text-sm border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Browse More Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
