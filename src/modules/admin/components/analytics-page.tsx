'use client';

import { AdminSidebarLayout } from '@/components/layouts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Spinner } from '@/components/ui/spinner';
import { useAllUsers, useAssessmentTrends, useScoreDistribution } from '@/modules/admin/hooks';
import { useUsersWithAssessment } from '@/modules/assessment/hooks';
import { Activity, BarChart3, TrendingUp, Users } from 'lucide-react';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

const chartConfig = {
  completedCount: {
    label: 'Completed',
    color: '#3b82f6', // Blue for completed
  },
  inProgressCount: {
    label: 'In Progress',
    color: '#8b5cf6', // Purple for in-progress
  },
  startedCount: {
    label: 'Started',
    color: '#10b981', // Green for started
  },
  count: {
    label: 'Count',
    color: '#3b82f6', // Blue for count
  },
} satisfies ChartConfig;

export const AnalyticsPage = () => {
  const {
    users: assessmentUsers,
    totalCount: totalAssessments,
    completedCount,
    inProgressCount,
    loading: loadingAssessments,
  } = useUsersWithAssessment();

  const { users: allUsers, loading: loadingUsers } = useAllUsers();

  // Fetch real analytics data from the new APIs
  const { trends, loading: loadingTrends } = useAssessmentTrends(7); // Last 7 days
  const {
    distribution,
    averageScore: apiAverageScore,
    loading: loadingDistribution,
  } = useScoreDistribution();

  const isLoading = loadingAssessments || loadingUsers;
  const isChartsLoading = loadingTrends || loadingDistribution;

  // Calculate completion rate
  const completionRate = useMemo(() => {
    if (totalAssessments === 0) return 0;
    return Math.round((completedCount / totalAssessments) * 100);
  }, [completedCount, totalAssessments]);

  // Use API average score, fallback to calculated if not available
  const avgScore = useMemo(() => {
    if (apiAverageScore > 0) {
      return Math.round(apiAverageScore);
    }
    const completedWithScores = assessmentUsers.filter(
      (user) => user.status === 'completed' && user.totalScore !== null
    );
    if (completedWithScores.length === 0) return 0;
    const sum = completedWithScores.reduce((acc, user) => acc + (user.totalScore || 0), 0);
    return Math.round(sum / completedWithScores.length);
  }, [assessmentUsers, apiAverageScore]);

  // Format trend data for chart (convert date to day name)
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

  return (
    <AdminSidebarLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-2">
            View detailed analytics and performance metrics
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Spinner className="h-8 w-8" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Assessments</CardDescription>
                  <CardTitle className="text-3xl">{totalAssessments}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BarChart3 className="h-4 w-4" />
                    <span>{completedCount} completed</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Completion Rate</CardDescription>
                  <CardTitle className="text-3xl">{completionRate}%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">
                      {completedCount} of {totalAssessments}
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Active Users</CardDescription>
                  <CardTitle className="text-3xl">{allUsers.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span>{inProgressCount} in progress</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Avg. Score</CardDescription>
                  <CardTitle className="text-3xl">{avgScore}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Activity className="h-4 w-4 text-purple-600" />
                    <span>Out of 500</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Trends</CardTitle>
                  <CardDescription>
                    Track assessment completion over the last 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isChartsLoading ? (
                    <div className="flex items-center justify-center h-[300px]">
                      <Spinner className="h-6 w-6" />
                    </div>
                  ) : trendData.length > 0 ? (
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                      <LineChart
                        accessibilityLayer
                        data={trendData}
                        margin={{
                          left: 0,
                          right: 12,
                          top: 12,
                          bottom: 12,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          allowDecimals={false}
                          width={30}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Line
                          dataKey="completedCount"
                          type="monotone"
                          stroke="var(--color-completedCount)"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line
                          dataKey="inProgressCount"
                          type="monotone"
                          stroke="var(--color-inProgressCount)"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ChartContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                      No trend data available
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Score Distribution</CardTitle>
                  <CardDescription>View score ranges and patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  {isChartsLoading ? (
                    <div className="flex items-center justify-center h-[300px]">
                      <Spinner className="h-6 w-6" />
                    </div>
                  ) : distribution.length > 0 ? (
                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                      <BarChart
                        accessibilityLayer
                        data={distribution}
                        margin={{
                          left: 0,
                          right: 12,
                          top: 12,
                          bottom: 12,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="range" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={30} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                      </BarChart>
                    </ChartContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                      No score data available
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </AdminSidebarLayout>
  );
};
