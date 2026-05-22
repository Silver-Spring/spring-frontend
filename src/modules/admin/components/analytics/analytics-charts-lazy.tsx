'use client';

import dynamic from 'next/dynamic';
import { AdminPanelSkeleton } from '@/modules/admin/components/shared/admin-panel-skeleton';

const AnalyticsTrendChart = dynamic(
  () => import('./analytics-charts').then((mod) => ({ default: mod.AnalyticsTrendChart })),
  { loading: () => <AdminPanelSkeleton /> }
);

const AnalyticsScoreDistributionChart = dynamic(
  () =>
    import('./analytics-charts').then((mod) => ({
      default: mod.AnalyticsScoreDistributionChart,
    })),
  { loading: () => <AdminPanelSkeleton /> }
);

export { AnalyticsScoreDistributionChart, AnalyticsTrendChart };
