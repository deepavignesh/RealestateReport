import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, User, Calendar, Download, Tag, ArrowLeft, Lock, FileText, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useApp } from '../context/AppContext';

export default function ReportDetail() {
  const { id } = useParams<{ id: string }>();
  const { reports, currentUser, buyReport, purchases } = useApp();
  const navigate = useNavigate();

  const report = reports.find((r) => r.id === id);

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Report not found</h2>
          <Link to="/marketplace" className="text-blue-600 mt-4 inline-block">
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const alreadyPurchased = currentUser
    ? purchases.some((p) => p.buyerId === currentUser.id && p.reportId === report.id)
    : false;

  const handleBuyNow = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    buyReport(report.id);
    navigate('/purchase-success');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="relative h-72 overflow-hidden">
                <img
                  src={report.image}
                  alt={report.address}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-semibold px-3 py-1.5 bg-white rounded-full shadow-sm text-gray-700">
                    {report.propertyType}
                  </span>
                </div>
              </div>
              <div className="p-7">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{report.address}</h1>
                <div className="flex items-center gap-1.5 text-gray-500 mb-5">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">
                    {report.city}, {report.state}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Inspector</p>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gray-500" />
                      <p className="text-sm font-semibold text-gray-800">{report.inspectorName}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Date</p>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-500" />
                      <p className="text-sm font-semibold text-gray-800">{report.uploadedAt}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Downloads</p>
                    <div className="flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5 text-gray-500" />
                      <p className="text-sm font-semibold text-gray-800">{report.downloads}</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-base font-semibold text-gray-900 mb-2">About this Report</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{report.description}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  Report Preview
                </h2>
                <p className="text-sm text-gray-400 mt-1">Purchase to unlock the full report</p>
              </div>
              <div className="relative">
                <div className="p-6 space-y-3">
                  {['Executive Summary', 'Foundation Assessment', 'Roof Condition', 'HVAC Systems', 'Electrical Systems', 'Plumbing Review', 'Interior Condition', 'Exterior Condition', 'Recommendations'].map((section) => (
                    <div key={section} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                        <FileText className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{section}</span>
                      {!alreadyPurchased && <Lock className="w-3.5 h-3.5 text-gray-400 ml-auto" />}
                      {alreadyPurchased && <CheckCircle className="w-3.5 h-3.5 text-emerald-500 ml-auto" />}
                    </div>
                  ))}
                </div>
                {!alreadyPurchased && (
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-8">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-sm font-semibold text-gray-700">Purchase to unlock full report</p>
                      <p className="text-xs text-gray-400 mt-1">30+ pages of detailed analysis</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 sticky top-24">
              <div className="flex items-center gap-1.5 mb-1">
                <Tag className="w-5 h-5 text-blue-500" />
                <span className="text-3xl font-bold text-gray-900">${report.price}</span>
              </div>
              <p className="text-sm text-gray-400 mb-6">One-time payment, instant access</p>

              <ul className="space-y-2 mb-6">
                {[
                  'Full 30+ page inspection report',
                  'High-resolution photos included',
                  'Inspector certification verified',
                  'Instant PDF download',
                  'Lifetime access to report',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              {alreadyPurchased ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-3 rounded-xl">
                    <CheckCircle className="w-4 h-4" />
                    Report Purchased
                  </div>
                  <button
                    onClick={() => navigate('/buyer/reports')}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
                  >
                    View in My Reports
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-150 shadow-sm hover:shadow-blue-200 hover:shadow-md"
                >
                  Buy Now
                </button>
              )}

              <p className="text-xs text-center text-gray-400 mt-4">
                Secured by SureReport's Verified Inspector Network
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
