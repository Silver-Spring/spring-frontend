'use client';

import { AdminKpiCard } from '@/modules/admin/components/shared/admin-kpi-card';
import { AdminPageHeader } from '@/modules/admin/components/shared/admin-page-header';
import { DashboardInsightsSection } from '@/modules/admin/components/dashboard/dashboard-insights-section';
import { DashboardQuickActions } from '@/modules/admin/components/dashboard/dashboard-quick-actions';
import { useAllUsers, useAdminAssessmentTypes } from '@/modules/admin/hooks';
import { useAdminStats, useUsersWithAssessment } from '@/modules/assessment/hooks';
import { useCurrentUser } from '@/modules/auth/hooks/use-current-user';
import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  Users,
} from 'lucide-react';
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

  const isLoading = loadingUsers || loadingAssessments || loadingStats || loadingTypes;

  const handleRefresh = useCallback(async () => {
    await Promise.all([
      refetchUsers(),
      refetchAssessments(),
      refetchStats(),
      refetchTypes(),
    ]);
  }, [refetchUsers, refetchAssessments, refetchStats, refetchTypes]);

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
        description="Sessions, users, content."
        onRefresh={handleRefresh}
        refreshing={isLoading}
      />

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <AdminKpiCard
          label="Sessions"
          value={totalAssessments}
          insight="Started (in progress + done)"
          icon={ClipboardList}
          loading={isLoading}
        />
        <AdminKpiCard
          label="Users"
          value={totalUsers}
          insight="Accounts"
          icon={Users}
          loading={isLoading}
        />
        <AdminKpiCard
          label="Completed"
          value={completedCount}
          insight={`${completionRate}% of sessions`}
          icon={CheckCircle2}
          loading={isLoading}
          tone="success"
        />
        <AdminKpiCard
          label="In progress"
          value={inProgressCount}
          insight="Not submitted"
          icon={Clock}
          loading={isLoading}
          tone={inProgressCount > 0 ? 'warning' : 'muted'}
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AdminKpiCard
          label="Sections"
          value={stats?.totalSections ?? 0}
          insight="All types"
          icon={FileText}
          loading={isLoading}
        />
        <AdminKpiCard
          label="Questions"
          value={stats?.totalQuestions ?? 0}
          insight={`${stats?.activeQuestions ?? 0} active`}
          icon={ClipboardList}
          loading={isLoading}
        />
        <AdminKpiCard
          label="Score bands"
          value={stats?.totalInterpretationBands ?? 0}
          insight="Bands defined"
          icon={BarChart3}
          loading={isLoading}
        />
      </section>

      <DashboardInsightsSection
        inProgressCount={inProgressCount}
        draftTypeCount={draftTypeCount}
        totalQuestions={stats?.totalQuestions ?? 0}
        activeQuestions={stats?.activeQuestions ?? 0}
        loading={isLoading}
      />

      <DashboardQuickActions
        totalUsers={totalUsers}
        liveTypeCount={liveTypeCount}
        draftTypeCount={draftTypeCount}
      />
    </div>
  );
};

export { AdminDashboardPage };
