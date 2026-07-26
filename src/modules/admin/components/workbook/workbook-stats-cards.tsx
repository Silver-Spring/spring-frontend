'use client';

import { AdminKpiCard } from '@/modules/admin/components/shared/admin-kpi-card';
import { formatAmount } from '@/lib/payment-utils';
import { AlertCircle, BookOpen, IndianRupee, Ticket, TrendingUp } from 'lucide-react';

type WorkbookStats = {
  totalPurchases: number;
  totalRevenue: number;
  recentPurchases: number;
  pendingPurchases: number;
  failedPurchases: number;
  couponPurchases: number;
  freePurchases: number;
  uniqueBuyers: number;
  averageOrderValue: number;
  totalDiscountGiven: number;
  last7DaysPurchases: number;
  last7DaysRevenue: number;
};

type WorkbookStatsCardsProps = {
  stats: WorkbookStats | null;
  loading?: boolean;
};

const WorkbookStatsCards = ({ stats, loading = false }: WorkbookStatsCardsProps) => {
  const incompleteCount = (stats?.pendingPurchases ?? 0) + (stats?.failedPurchases ?? 0);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
      <AdminKpiCard
        label="Copies sold"
        value={stats?.totalPurchases ?? 0}
        insight={`${stats?.uniqueBuyers ?? 0} unique buyer${(stats?.uniqueBuyers ?? 0) === 1 ? '' : 's'}`}
        icon={BookOpen}
        loading={loading}
      />
      <AdminKpiCard
        label="Revenue"
        value={formatAmount(stats?.totalRevenue ?? 0)}
        insight={`Avg ${formatAmount(stats?.averageOrderValue ?? 0)} per copy`}
        icon={IndianRupee}
        loading={loading}
        tone="success"
      />
      <AdminKpiCard
        label="Last 7 days"
        value={stats?.last7DaysPurchases ?? 0}
        insight={`${formatAmount(stats?.last7DaysRevenue ?? 0)} collected · ${stats?.recentPurchases ?? 0} in last 24h`}
        icon={TrendingUp}
        loading={loading}
      />
      <AdminKpiCard
        label="Coupons used"
        value={stats?.couponPurchases ?? 0}
        insight={`${stats?.freePurchases ?? 0} free ${(stats?.freePurchases ?? 0) === 1 ? 'copy' : 'copies'} · ${formatAmount(stats?.totalDiscountGiven ?? 0)} discount given`}
        icon={Ticket}
        loading={loading}
      />
      <AdminKpiCard
        label="Incomplete"
        value={incompleteCount}
        insight={`${stats?.pendingPurchases ?? 0} pending · ${stats?.failedPurchases ?? 0} failed`}
        icon={AlertCircle}
        loading={loading}
        tone={incompleteCount > 0 ? 'warning' : 'muted'}
      />
    </section>
  );
};

export { WorkbookStatsCards };
export type { WorkbookStats };
