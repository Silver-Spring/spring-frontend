'use client';

import { AdminKpiCard } from '@/modules/admin/components/shared/admin-kpi-card';
import { AdminPageHeader } from '@/modules/admin/components/shared/admin-page-header';
import { DashboardContentHealth } from '@/modules/admin/components/dashboard/dashboard-content-health';
import { DashboardInsightsSection } from '@/modules/admin/components/dashboard/dashboard-insights-section';
import { DashboardQuickActions } from '@/modules/admin/components/dashboard/dashboard-quick-actions';
import { DashboardRecentPurchases } from '@/modules/admin/components/dashboard/dashboard-recent-purchases';
import { DashboardRevenueSection } from '@/modules/admin/components/dashboard/dashboard-revenue-section';
import {
  useAdminAssessmentTypes,
  useAdminPaymentAnalytics,
  useAdminWorkbookPurchases,
  useAdminWorkbookStats,
  useAllUsers,
} from '@/modules/admin/hooks';
import { useAdminStats, useUsersWithAssessment } from '@/modules/assessment/hooks';
import { useCurrentUser } from '@/modules/auth/hooks/use-current-user';
import { CheckCircle2, ClipboardList, Clock, Users } from 'lucide-react';
import { useCallback, useMemo } from 'react';

const AdminDashboardPage = () => {
  const { currentUser } = useCurrentUser();
  const { totalCount: totalUsers, loading: loadingUsers, refetch: refetchUsers } = useAllUsers();
  const {
    totalCount: totalAssessments,
    completedCount,
    inProgressCount,
    loading: loadingAssessments,
    refetch: refetchAssessments,
  } = useUsersWithAssessment();
  const { stats, loading: loadingStats, refetch: refetchStats } = useAdminStats();
  const { assessmentTypes, loading: loadingTypes, refetch: refetchTypes } = useAdminAssessmentTypes();
  const {
    analytics: paymentAnalytics,
    loading: loadingPayments,
    refetch: refetchPayments,
  } = useAdminPaymentAnalytics();
  const {
    stats: workbookStats,
    loading: loadingWorkbookStats,
    refetch: refetchWorkbookStats,
  } = useAdminWorkbookStats();
  const {
    purchases: recentPurchases,
    loading: loadingRecentPurchases,
    refetch: refetchRecentPurchases,
  } = useAdminWorkbookPurchases({ count: 5 });

  const activityLoading = loadingUsers || loadingAssessments;
  const revenueLoading = loadingPayments || loadingWorkbookStats;
  const contentLoading = loadingStats || loadingTypes;
  const isLoading = activityLoading || revenueLoading || contentLoading || loadingRecentPurchases;

  const handleRefresh = useCallback(async () => {
    await Promise.all([
      refetchUsers(),
      refetchAssessments(),
      refetchStats(),
      refetchTypes(),
      refetchPayments(),
      refetchWorkbookStats(),
      refetchRecentPurchases(),
    ]);
  }, [
    refetchUsers,
    refetchAssessments,
    refetchStats,
    refetchTypes,
    refetchPayments,
    refetchWorkbookStats,
    refetchRecentPurchases,
  ]);

  const completionRate = useMemo(
    () => (totalAssessments > 0 ? Math.round((completedCount / totalAssessments) * 100) : 0),
    [completedCount, totalAssessments]
  );

  const liveTypeCount = useMemo(
    () => assessmentTypes.filter((type) => type.isActive).length,
    [assessmentTypes]
  );

  const draftTypeCount = useMemo(
    () => assessmentTypes.filter((type) => !type.isActive).length,
    [assessmentTypes]
  );

  return (
    <div className="p-6 md:p-8 space-y-8">
      <AdminPageHeader
        title={currentUser?.name ? `Hi, ${currentUser.name}` : 'Dashboard'}
        description="Revenue, activity and content health at a glance."
        onRefresh={handleRefresh}
        refreshing={isLoading}
      />

      <DashboardInsightsSection
        inProgressCount={inProgressCount}
        draftTypeCount={draftTypeCount}
        totalQuestions={stats?.totalQuestions ?? 0}
        activeQuestions={stats?.activeQuestions ?? 0}
        failedPayments={paymentAnalytics?.failedPayments ?? 0}
        failedWorkbookPurchases={workbookStats?.failedPurchases ?? 0}
        pendingWorkbookPurchases={workbookStats?.pendingPurchases ?? 0}
        loading={isLoading}
      />

      <DashboardRevenueSection
        assessmentRevenue={paymentAnalytics?.capturedAmount ?? 0}
        assessmentPurchases={paymentAnalytics?.capturedPayments ?? 0}
        workbookRevenue={workbookStats?.totalRevenue ?? 0}
        workbookPurchases={workbookStats?.totalPurchases ?? 0}
        failedPayments={paymentAnalytics?.failedPayments ?? 0}
        failedWorkbookPurchases={workbookStats?.failedPurchases ?? 0}
        loading={revenueLoading}
      />

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Assessment activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <AdminKpiCard
            label="Users"
            value={totalUsers}
            insight="Registered accounts"
            icon={Users}
            loading={activityLoading}
          />
          <AdminKpiCard
            label="Sessions"
            value={totalAssessments}
            insight="Started (in progress + done)"
            icon={ClipboardList}
            loading={activityLoading}
          />
          <AdminKpiCard
            label="Completed"
            value={completedCount}
            insight={`${completionRate}% of sessions`}
            icon={CheckCircle2}
            loading={activityLoading}
            tone="success"
          />
          <AdminKpiCard
            label="In progress"
            value={inProgressCount}
            insight="Not submitted yet"
            icon={Clock}
            loading={activityLoading}
            tone={inProgressCount > 0 ? 'warning' : 'muted'}
          />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DashboardRecentPurchases purchases={recentPurchases} loading={loadingRecentPurchases} />
        <DashboardContentHealth
          liveTypeCount={liveTypeCount}
          draftTypeCount={draftTypeCount}
          totalSections={stats?.totalSections ?? 0}
          totalQuestions={stats?.totalQuestions ?? 0}
          activeQuestions={stats?.activeQuestions ?? 0}
          totalInterpretationBands={stats?.totalInterpretationBands ?? 0}
          loading={contentLoading}
        />
      </section>

      <DashboardQuickActions
        totalUsers={totalUsers}
        liveTypeCount={liveTypeCount}
        draftTypeCount={draftTypeCount}
        workbookPurchases={workbookStats?.totalPurchases ?? 0}
      />
    </div>
  );
};

export { AdminDashboardPage };
