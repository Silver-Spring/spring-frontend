'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { getDateRangeTimestamps } from '@/lib/payment-utils';
import type { AdminWorkbookPurchaseItem } from '@/gql/schema-types';
import { useAdminWorkbookPurchases, useAdminWorkbookStats } from '../hooks';
import { AdminPageHeader } from './shared/admin-page-header';
import { WorkbookPurchaseDetailsDrawer } from './dialogs/workbook-purchase-details-drawer';
import { WorkbookPurchasesDataTable, WorkbookStatsCards } from './workbook';

type DateRangeOption =
  'allTime' | 'today' | 'yesterday' | 'last7days' | 'last30days' | 'thisMonth' | 'lastMonth';

type StatusOption = 'all' | 'captured' | 'created' | 'failed';

const STATUS_OPTIONS: Array<{ value: StatusOption; label: string }> = [
  { value: 'all', label: 'All statuses' },
  { value: 'captured', label: 'Captured' },
  { value: 'created', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
];

export const WorkbooksPage = () => {
  const [dateRange, setDateRange] = useState<DateRangeOption>('allTime');
  const [status, setStatus] = useState<StatusOption>('all');
  const [selectedPurchase, setSelectedPurchase] = useState<AdminWorkbookPurchaseItem | null>(null);

  const timestamps = getDateRangeTimestamps(dateRange);

  const { stats, loading: statsLoading, refetch: refetchStats } = useAdminWorkbookStats();

  const {
    purchases,
    totalCount,
    loading: purchasesLoading,
    refetch: refetchPurchases,
  } = useAdminWorkbookPurchases({
    ...(timestamps ?? {}),
    ...(status !== 'all' ? { status } : {}),
    count: 500,
  });

  const handleRefresh = async () => {
    await Promise.all([refetchStats(), refetchPurchases()]);
  };

  const handleViewDetails = (purchase: AdminWorkbookPurchaseItem) => {
    setSelectedPurchase(purchase);
  };

  return (
    <>
      <div className="p-6 md:p-8 space-y-6">
        <AdminPageHeader
          eyebrow="Revenue"
          title="Workbook Sales"
          description="Everyone who bought the retirement workbook — buyer details, payment status, coupons and revenue."
          onRefresh={handleRefresh}
          refreshing={statsLoading || purchasesLoading}
        />

        <WorkbookStatsCards stats={stats} loading={statsLoading} />

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1.5">
                <CardTitle>Purchases</CardTitle>
                <CardDescription>
                  {purchasesLoading
                    ? 'Loading purchases...'
                    : `${totalCount} purchase${totalCount === 1 ? '' : 's'} in the selected period`}
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Select value={status} onValueChange={(value) => setStatus(value as StatusOption)}>
                  <SelectTrigger className="w-full sm:w-40" aria-label="Filter by status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={dateRange}
                  onValueChange={(value) => setDateRange(value as DateRangeOption)}
                >
                  <SelectTrigger className="w-full sm:w-40" aria-label="Filter by date range">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="allTime">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {purchasesLoading ? (
              <div className="flex items-center justify-center h-64">
                <Spinner className="h-8 w-8" />
              </div>
            ) : (
              <WorkbookPurchasesDataTable data={purchases} onViewDetails={handleViewDetails} />
            )}
          </CardContent>
        </Card>
      </div>

      <WorkbookPurchaseDetailsDrawer
        open={!!selectedPurchase}
        onOpenChange={(open) => !open && setSelectedPurchase(null)}
        purchase={selectedPurchase}
      />
    </>
  );
};
