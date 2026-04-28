'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { formatAmount } from '@/lib/payment-utils';
import { Activity, CheckCircle, Plus, Ticket, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { useAdminCouponAnalytics, useAdminListCoupons } from '../hooks';
import { CouponsDataTable } from './coupons/coupons-data-table';
import { CreateCouponDialog } from './dialogs/create-coupon-dialog';

export const CouponsPage = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const {
    coupons,
    totalCount,
    loading: couponsLoading,
    refetch: refetchCoupons,
  } = useAdminListCoupons();
  const {
    analytics,
    loading: analyticsLoading,
    refetch: refetchAnalytics,
  } = useAdminCouponAnalytics();

  const isInitialLoading = (couponsLoading || analyticsLoading) && !coupons.length && !analytics;
  const isRefetching = (couponsLoading || analyticsLoading) && (coupons.length > 0 || analytics);

  const handleCouponCreated = () => {
    setShowCreateDialog(false);
    refetchCoupons();
    refetchAnalytics();
  };

  const handleRefetch = () => {
    refetchCoupons();
    refetchAnalytics();
  };

  if (isInitialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 relative">
      {isRefetching && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm">
            <Spinner className="h-4 w-4" />
            <span className="text-primary">Updating...</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Coupon Management</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage discount coupons for assessments
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Coupon
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Coupons</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalCoupons ?? 0}</div>
            <p className="text-xs text-muted-foreground mt-1">All time coupons created</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Coupons</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.activeCoupons ?? 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Redemptions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics?.totalRedemptions?.toLocaleString() ?? 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Times coupons were used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Discount Given</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatAmount(analytics?.totalDiscountGiven ?? 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Revenue foregone</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Coupons ({totalCount})</CardTitle>
        </CardHeader>
        <CardContent>
          <CouponsDataTable coupons={coupons as any} onRefetch={handleRefetch} />
        </CardContent>
      </Card>

      <CreateCouponDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSuccess={handleCouponCreated}
      />
    </div>
  );
};
