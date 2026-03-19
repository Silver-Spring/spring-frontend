'use client';

import { useState } from 'react';
import { AdminSidebarLayout } from '@/components/layouts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RefreshCw } from 'lucide-react';
import {
  useAdminPaymentsList,
  useAdminPaymentAnalytics,
  useAdminSettlementsList,
  useAdminRefundsList,
} from '../hooks';
import { getDateRangeTimestamps } from '@/lib/payment-utils';
import { PaymentDetailsDrawer } from './dialogs';
import {
  PaymentAnalyticsCards,
  PaymentMethodsBreakdown,
  PaymentsDataTable,
  SettlementsDataTable,
  RefundsDataTable,
} from './payment';

type DateRangeOption =
  | 'allTime'
  | 'today'
  | 'yesterday'
  | 'last7days'
  | 'last30days'
  | 'thisMonth'
  | 'lastMonth';

export const PaymentObservabilityPage = () => {
  const [dateRange, setDateRange] = useState<DateRangeOption>('last30days');
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);

  const timestamps = getDateRangeTimestamps(dateRange);

  const {
    analytics,
    loading: analyticsLoading,
    refetch: refetchAnalytics,
  } = useAdminPaymentAnalytics(timestamps || undefined);

  const {
    payments,
    loading: paymentsLoading,
    refetch: refetchPayments,
  } = useAdminPaymentsList(
    timestamps ? { ...timestamps, count: 100 } : { count: 100 }
  );

  const {
    settlements,
    loading: settlementsLoading,
    refetch: refetchSettlements,
  } = useAdminSettlementsList(
    timestamps ? { ...timestamps, count: 100 } : { count: 100 }
  );

  const {
    refunds,
    loading: refundsLoading,
    refetch: refetchRefunds,
  } = useAdminRefundsList(
    timestamps ? { ...timestamps, count: 100 } : { count: 100 }
  );

  const handleRefreshAll = async () => {
    await Promise.all([
      refetchAnalytics(),
      refetchPayments(),
      refetchSettlements(),
      refetchRefunds(),
    ]);
  };

  const handleViewDetails = (paymentId: string) => {
    setSelectedPaymentId(paymentId);
  };

  return (
    <AdminSidebarLayout>
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6 lg:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Payment Observability
              </h1>
              <p className="text-sm text-muted-foreground mt-1 md:text-base md:mt-2">
                Monitor payments, settlements, and refunds from Razorpay
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <Select
                value={dateRange}
                onValueChange={(value) => setDateRange(value as DateRangeOption)}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
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
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshAll}
                className="w-full sm:w-auto"
              >
                <RefreshCw
                  className={`h-4 w-4 sm:mr-2 ${analyticsLoading ? 'animate-spin' : ''}`}
                />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
            </div>
          </div>

          {analyticsLoading ? (
            <div className="flex items-center justify-center h-32">
              <Spinner className="h-8 w-8" />
            </div>
          ) : analytics ? (
            <>
              <PaymentAnalyticsCards analytics={analytics} />
              <PaymentMethodsBreakdown breakdown={analytics.paymentMethodBreakdown || []} />
            </>
          ) : null}

          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>View all payments, settlements, and refunds</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="payments" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="payments" className="text-xs sm:text-sm">
                    Payments
                  </TabsTrigger>
                  <TabsTrigger value="settlements" className="text-xs sm:text-sm">
                    Settlements
                  </TabsTrigger>
                  <TabsTrigger value="refunds" className="text-xs sm:text-sm">
                    Refunds
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="payments" className="mt-4">
                  {paymentsLoading ? (
                    <div className="flex items-center justify-center h-64">
                      <Spinner className="h-8 w-8" />
                    </div>
                  ) : (
                    <PaymentsDataTable data={payments} onViewDetails={handleViewDetails} />
                  )}
                </TabsContent>

                <TabsContent value="settlements" className="mt-4">
                  {settlementsLoading ? (
                    <div className="flex items-center justify-center h-64">
                      <Spinner className="h-8 w-8" />
                    </div>
                  ) : (
                    <SettlementsDataTable data={settlements} />
                  )}
                </TabsContent>

                <TabsContent value="refunds" className="mt-4">
                  {refundsLoading ? (
                    <div className="flex items-center justify-center h-64">
                      <Spinner className="h-8 w-8" />
                    </div>
                  ) : (
                    <RefundsDataTable data={refunds} onViewPaymentDetails={handleViewDetails} />
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <PaymentDetailsDrawer
        open={!!selectedPaymentId}
        onOpenChange={(open) => !open && setSelectedPaymentId(null)}
        paymentId={selectedPaymentId}
      />
    </AdminSidebarLayout>
  );
};
