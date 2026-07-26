'use client';

import { AdminKpiCard } from '@/modules/admin/components/shared/admin-kpi-card';
import { formatAmount } from '@/lib/payment-utils';
import { AlertCircle, BookOpen, ClipboardCheck, IndianRupee } from 'lucide-react';

type RevenueSectionProps = {
  assessmentRevenue: number;
  assessmentPurchases: number;
  workbookRevenue: number;
  workbookPurchases: number;
  failedPayments: number;
  failedWorkbookPurchases: number;
  loading?: boolean;
};

const DashboardRevenueSection = ({
  assessmentRevenue,
  assessmentPurchases,
  workbookRevenue,
  workbookPurchases,
  failedPayments,
  failedWorkbookPurchases,
  loading = false,
}: RevenueSectionProps) => {
  const totalRevenue = assessmentRevenue + workbookRevenue;
  const totalFailed = failedPayments + failedWorkbookPurchases;

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">Revenue</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <AdminKpiCard
          label="Total revenue"
          value={formatAmount(totalRevenue)}
          insight="Assessments + workbooks, all time"
          icon={IndianRupee}
          loading={loading}
          tone="success"
        />
        <AdminKpiCard
          label="Assessment sales"
          value={formatAmount(assessmentRevenue)}
          insight={`${assessmentPurchases} captured payment${assessmentPurchases === 1 ? '' : 's'}`}
          icon={ClipboardCheck}
          loading={loading}
        />
        <AdminKpiCard
          label="Workbook sales"
          value={formatAmount(workbookRevenue)}
          insight={`${workbookPurchases} ${workbookPurchases === 1 ? 'copy' : 'copies'} sold`}
          icon={BookOpen}
          loading={loading}
        />
        <AdminKpiCard
          label="Failed payments"
          value={totalFailed}
          insight={`${failedPayments} assessment · ${failedWorkbookPurchases} workbook`}
          icon={AlertCircle}
          loading={loading}
          tone={totalFailed > 0 ? 'warning' : 'muted'}
        />
      </div>
    </section>
  );
};

export { DashboardRevenueSection };
