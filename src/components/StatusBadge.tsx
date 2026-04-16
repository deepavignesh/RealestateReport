import { ReportStatus } from '../data/mockData';

const styles: Record<ReportStatus, string> = {
  approved: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  rejected: 'bg-red-50 text-red-700 border border-red-200',
};

const labels: Record<ReportStatus, string> = {
  approved: 'Approved',
  pending: 'Pending Approval',
  rejected: 'Rejected',
};

export default function StatusBadge({ status }: { status: ReportStatus }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
