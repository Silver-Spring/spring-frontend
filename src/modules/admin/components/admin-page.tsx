'use client';

import { AdminSidebarLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useAllUsers } from '@/modules/admin/hooks';
import { useAdminStats, useUsersWithAssessment } from '@/modules/assessment/hooks';
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  RefreshCw,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';

export const AdminPage = () => {
  const { totalCount: totalUsers, loading: loadingUsers, refetch: refetchUsers } = useAllUsers();
  const {
    totalCount: totalAssessments,
    completedCount,
    inProgressCount,
    loading: loadingAssessments,
    refetch: refetchAssessments,
  } = useUsersWithAssessment();
  const { stats, loading: loadingStats, refetch: refetchStats } = useAdminStats();

  const isLoading = loadingUsers || loadingAssessments || loadingStats;

  const handleRefresh = async () => {
    await Promise.all([refetchUsers(), refetchAssessments(), refetchStats()]);
  };

  const completionRate =
    totalAssessments > 0 ? Math.round((completedCount / totalAssessments) * 100) : 0;

  return (
    <AdminSidebarLayout>
      {({ currentUser }) => (
        <div className="p-6 md:p-8 space-y-8">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
              <p className="text-muted-foreground mt-2">
                Welcome back, {currentUser?.name || 'Admin'}! Here's what's happening today.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>Total Assessments</CardDescription>
                  <ClipboardList className="h-4 w-4 text-muted-foreground" />
                </div>
                {isLoading ? (
                  <Spinner className="h-8 w-8 mt-2" />
                ) : (
                  <CardTitle className="text-3xl">{totalAssessments}</CardTitle>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Activity className="h-3 w-3 mr-1" />
                  <span>Assessment sessions</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>Total Users</CardDescription>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                {isLoading ? (
                  <Spinner className="h-8 w-8 mt-2" />
                ) : (
                  <CardTitle className="text-3xl">{totalUsers}</CardTitle>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Activity className="h-3 w-3 mr-1" />
                  <span>Registered users</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>Completed</CardDescription>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </div>
                {isLoading ? (
                  <Spinner className="h-8 w-8 mt-2" />
                ) : (
                  <CardTitle className="text-3xl">{completedCount}</CardTitle>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Activity className="h-3 w-3 mr-1" />
                  <span>{completionRate}% completion rate</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>In Progress</CardDescription>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                {isLoading ? (
                  <Spinner className="h-8 w-8 mt-2" />
                ) : (
                  <CardTitle className="text-3xl">{inProgressCount}</CardTitle>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Activity className="h-3 w-3 mr-1" />
                  <span>Active sessions</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assessment Stats Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>Sections</CardDescription>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                {isLoading ? (
                  <Spinner className="h-8 w-8 mt-2" />
                ) : (
                  <CardTitle className="text-3xl">{stats?.totalSections ?? 0}</CardTitle>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Assessment sections</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>Questions</CardDescription>
                  <ClipboardList className="h-4 w-4 text-muted-foreground" />
                </div>
                {isLoading ? (
                  <Spinner className="h-8 w-8 mt-2" />
                ) : (
                  <CardTitle className="text-3xl">{stats?.totalQuestions ?? 0}</CardTitle>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    {stats?.activeQuestions ?? 0} active
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-orange-600" />
                    {stats?.inactiveQuestions ?? 0} inactive
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>Interpretations</CardDescription>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
                {isLoading ? (
                  <Spinner className="h-8 w-8 mt-2" />
                ) : (
                  <CardTitle className="text-3xl">{stats?.totalInterpretationBands ?? 0}</CardTitle>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Interpretation bands</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Access Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Quick Access</h2>
              <p className="text-sm text-muted-foreground">Navigate to key sections</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/admin/users">
                <Card className="hover:shadow-md transition-all cursor-pointer h-full group hover:border-primary/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors">
                        <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <CardTitle className="text-base">User Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Manage {totalUsers} users and permissions
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/analytics">
                <Card className="hover:shadow-md transition-all cursor-pointer h-full group hover:border-primary/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/30 transition-colors">
                        <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <CardTitle className="text-base">Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">View reports and insights</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/assessment">
                <Card className="hover:shadow-md transition-all cursor-pointer h-full group hover:border-primary/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 group-hover:bg-green-200 dark:group-hover:bg-green-900/30 transition-colors">
                        <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <CardTitle className="text-base">Assessments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {stats?.totalSections ?? 0} sections, {stats?.totalQuestions ?? 0} questions
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      )}
    </AdminSidebarLayout>
  );
};
