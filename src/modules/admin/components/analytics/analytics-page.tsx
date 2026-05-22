'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { AdminKpiCard } from '@/modules/admin/components/shared/admin-kpi-card';
import { AdminPageHeader } from '@/modules/admin/components/shared/admin-page-header';
import {
  AnalyticsScoreDistributionChart,
  AnalyticsTrendChart,
} from '@/modules/admin/components/analytics/analytics-charts-lazy';
import { AssessmentTypeSelector } from '@/modules/admin/components/assessment-type-selector';
import {
  ALL_ASSESSMENT_TYPES_FILTER,
  AssessmentTypeCode,
  AssessmentTypeFilter,
  DEFAULT_ASSESSMENT_TYPE,
} from '@/modules/assessment/constants';
import { useAllUsers, useAssessmentTrends, useScoreDistribution } from '@/modules/admin/hooks';
import { useUsersWithAssessment } from '@/modules/assessment/hooks';
import { Activity, BarChart3, TrendingUp, Users } from 'lucide-react';
import { useMemo, useState } from 'react';

export const AnalyticsPage = () => {
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<AssessmentTypeFilter>(
    DEFAULT_ASSESSMENT_TYPE
  );

  const isAllTypes = selectedTypeFilter === ALL_ASSESSMENT_TYPES_FILTER;
  const scoreDistributionType = isAllTypes
    ? DEFAULT_ASSESSMENT_TYPE
    : (selectedTypeFilter as AssessmentTypeCode);

  const {
    users: assessmentUsers,
    totalCount: totalAssessments,
    completedCount,
    inProgressCount,
    loading: loadingAssessments,
  } = useUsersWithAssessment(selectedTypeFilter);

  const { users: allUsers, loading: loadingUsers } = useAllUsers();

  const { trends, loading: loadingTrends } = useAssessmentTrends(7, selectedTypeFilter);
  const {
    distribution,
    averageScore: apiAverageScore,
    loading: loadingDistribution,
  } = useScoreDistribution(scoreDistributionType, { skip: isAllTypes });

  const isLoading = loadingAssessments || loadingUsers;
  const isChartsLoading = loadingTrends || (isAllTypes ? false : loadingDistribution);

  const completionRate = useMemo(() => {
    if (totalAssessments === 0) return 0;
    return Math.round((completedCount / totalAssessments) * 100);
  }, [completedCount, totalAssessments]);

  const avgScore = useMemo(() => {
    if (isAllTypes) {
      const completedWithScores = assessmentUsers.filter(
        (user) => user.status === 'completed' && user.totalScore !== null
      );
      if (completedWithScores.length === 0) return 0;
      const sum = completedWithScores.reduce((acc, user) => acc + (user.totalScore || 0), 0);
      return Math.round(sum / completedWithScores.length);
    }

    if (apiAverageScore > 0) {
      return Math.round(apiAverageScore);
    }

    const completedWithScores = assessmentUsers.filter(
      (user) => user.status === 'completed' && user.totalScore !== null
    );
    if (completedWithScores.length === 0) return 0;
    const sum = completedWithScores.reduce((acc, user) => acc + (user.totalScore || 0), 0);
    return Math.round(sum / completedWithScores.length);
  }, [assessmentUsers, apiAverageScore, isAllTypes]);

  const trendData = useMemo(() => {
    return trends.map((trend) => {
      const date = new Date(trend.date);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      return {
        day: dayName,
        date: trend.date,
        completedCount: trend.completedCount,
        inProgressCount: trend.inProgressCount,
        startedCount: trend.startedCount,
      };
    });
  }, [trends]);

  const filterLabel = isAllTypes ? 'all types' : selectedTypeFilter.toUpperCase();

  return (
    <div className="p-6 md:p-8 space-y-6">
      <AdminPageHeader
        title="Analytics"
        description="Completion trends and score distribution."
      />

      <AssessmentTypeSelector
        value={selectedTypeFilter}
        onChange={setSelectedTypeFilter}
        label="Assessment type"
        includeAllTypes
      />

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Spinner className="h-8 w-8" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <AdminKpiCard
              label="Sessions"
              value={totalAssessments}
              insight={`${completedCount} completed · ${filterLabel}`}
              icon={BarChart3}
            />
            <AdminKpiCard
              label="Completion"
              value={`${completionRate}%`}
              insight={`${completedCount} of ${totalAssessments}`}
              icon={TrendingUp}
              tone={completionRate >= 70 ? 'success' : 'warning'}
            />
            <AdminKpiCard
              label="Users"
              value={allUsers.length}
              insight={`${inProgressCount} in progress`}
              icon={Users}
            />
            <AdminKpiCard
              label="Avg. score"
              value={avgScore}
              insight={isAllTypes ? 'All types' : selectedTypeFilter.toUpperCase()}
              icon={Activity}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>7-day trends</CardTitle>
                <CardDescription>{filterLabel}</CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsTrendChart data={trendData} loading={loadingTrends} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Score distribution</CardTitle>
                <CardDescription>
                  {isAllTypes ? 'Select a type above' : filterLabel}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsScoreDistributionChart
                  distribution={distribution}
                  loading={isChartsLoading}
                  isAllTypes={isAllTypes}
                />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};
