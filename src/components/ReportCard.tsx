import { Link } from 'react-router-dom';
import { MapPin, Tag, ArrowRight } from 'lucide-react';
import { Report } from '../data/mockData';

interface ReportCardProps {
  report: Report;
}

const propertyTypeColors: Record<string, string> = {
  Residential: 'bg-emerald-50 text-emerald-700',
  Commercial: 'bg-blue-50 text-blue-700',
  Industrial: 'bg-amber-50 text-amber-700',
  Land: 'bg-green-50 text-green-700',
};

export default function ReportCard({ report }: ReportCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={report.image}
          alt={report.address}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${propertyTypeColors[report.propertyType]}`}>
            {report.propertyType}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start gap-1.5 mb-2">
          <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-gray-900 leading-tight">{report.address}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {report.city}, {report.state}
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-500 line-clamp-2 mt-2 mb-4">{report.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-lg font-bold text-gray-900">${report.price}</span>
          </div>
          <Link
            to={`/marketplace/${report.id}`}
            className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group/btn"
          >
            View Report
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
