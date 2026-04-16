import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import ReportCard from '../components/ReportCard';
import { useApp } from '../context/AppContext';

const PROPERTY_TYPES = ['All', 'Residential', 'Commercial', 'Industrial', 'Land'] as const;
const STATES = ['All States', 'TX', 'CO', 'OR', 'AZ', 'TN', 'NC', 'FL', 'WA', 'CA'];

export default function Marketplace() {
  const { reports } = useApp();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedState, setSelectedState] = useState('All States');
  const [sortBy, setSortBy] = useState('newest');

  const approvedReports = useMemo(
    () => reports.filter((r) => r.status === 'approved'),
    [reports]
  );

  const filtered = useMemo(() => {
    let result = approvedReports;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.address.toLowerCase().includes(q) ||
          r.city.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q)
      );
    }
    if (selectedType !== 'All') {
      result = result.filter((r) => r.propertyType === selectedType);
    }
    if (selectedState !== 'All States') {
      result = result.filter((r) => r.state === selectedState);
    }
    if (sortBy === 'newest') {
      result = [...result].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
    } else if (sortBy === 'popular') {
      result = [...result].sort((a, b) => b.downloads - a.downloads);
    }
    return result;
  }, [approvedReports, search, selectedType, selectedState, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Nationwide Coverage</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Report Marketplace</h1>
          <p className="text-gray-500">
            {approvedReports.length} verified reports available from certified inspectors
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by address, city, or description..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
                >
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
              >
                {STATES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No reports found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-5">
              Showing <span className="font-semibold text-gray-900">{filtered.length}</span> report
              {filtered.length !== 1 ? 's' : ''}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
