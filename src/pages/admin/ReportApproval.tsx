import { useState } from 'react';
import { CheckCircle, XCircle, MapPin, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../../components/StatusBadge';
import { ReportStatus } from '../../data/mockData';

const FILTERS: { label: string; value: ReportStatus | 'all' }[] = [
  { label: 'All Reports', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

export default function ReportApproval() {
  const { reports, updateReportStatus } = useApp();
  const [filter, setFilter] = useState<ReportStatus | 'all'>('all');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const filtered = filter === 'all' ? reports : reports.filter((r) => r.status === filter);

  const handleAction = (id: string, status: ReportStatus) => {
    setProcessingId(id);
    setTimeout(() => {
      updateReportStatus(id, status);
      setProcessingId(null);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Report Management</h1>
        <p className="text-gray-500 text-sm mt-1">
          Review and approve or reject inspector-submitted reports
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <Filter className="w-4 h-4 text-gray-400" />
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
              filter === f.value
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            {f.label}
            <span
              className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                filter === f.value ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {f.value === 'all' ? reports.length : reports.filter((r) => r.status === f.value).length}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <CheckCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No reports in this category.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map((report) => (
              <div
                key={report.id}
                className={`flex flex-col sm:flex-row sm:items-center gap-5 p-5 hover:bg-gray-50 transition-colors ${
                  processingId === report.id ? 'opacity-50' : ''
                }`}
              >
                <img
                  src={report.image}
                  alt={report.address}
                  className="w-full sm:w-20 h-32 sm:h-14 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-gray-900">{report.address}</p>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {report.propertyType}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1.5">
                    <MapPin className="w-3 h-3" />
                    {report.city}, {report.state}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span>Inspector: <strong className="text-gray-700">{report.inspectorName}</strong></span>
                    <span>Uploaded: {report.uploadedAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <StatusBadge status={report.status} />
                  {report.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(report.id, 'approved')}
                        disabled={processingId === report.id}
                        className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200 disabled:opacity-50"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(report.id, 'rejected')}
                        disabled={processingId === report.id}
                        className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors border border-red-200 disabled:opacity-50"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </div>
                  )}
                  {report.status === 'approved' && (
                    <button
                      onClick={() => handleAction(report.id, 'rejected')}
                      disabled={processingId === report.id}
                      className="flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors border border-red-200 disabled:opacity-50"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Revoke
                    </button>
                  )}
                  {report.status === 'rejected' && (
                    <button
                      onClick={() => handleAction(report.id, 'approved')}
                      disabled={processingId === report.id}
                      className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200 disabled:opacity-50"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Re-approve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
