'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatAmount } from '@/lib/payment-utils';
import {
  Activity,
  AlertCircle,
  CreditCard,
  IndianRupee,
  IndianRupeeIcon,
  TrendingUp,
} from 'lucide-react';

interface PaymentAnalytics {
  totalPayments: number;
  totalAmount: number;
  capturedPayments: number;
  capturedAmount: number;
  failedPayments: number;
  failedAmount: number;
  refundedPayments: number;
  refundedAmount: number;
  averagePaymentAmount: number;
  successRate: number;
  recentPayments: number;
}

interface PaymentAnalyticsCardsProps {
  analytics: PaymentAnalytics;
}

export const PaymentAnalyticsCards = ({ analytics }: PaymentAnalyticsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Total Payments</CardDescription>
          <CardTitle className="text-3xl">{analytics.totalPayments}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CreditCard className="h-4 w-4" />
            <span>All transactions</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-3xl">{formatAmount(analytics.capturedAmount || 0)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <IndianRupee className="h-4 w-4" />
            <span>{analytics.capturedPayments} captured</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Success Rate</CardDescription>
          <CardTitle className="text-3xl">{analytics.successRate?.toFixed(1)}%</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-green-600">
              {analytics.capturedPayments} of {analytics.totalPayments}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Last 24 Hours</CardDescription>
          <CardTitle className="text-3xl">{analytics.recentPayments}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Activity className="h-4 w-4" />
            <span>Recent activity</span>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="pb-3">
          <CardDescription>Failed Payments</CardDescription>
          <CardTitle className="text-3xl">{analytics.failedPayments}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span>{formatAmount(analytics.failedAmount || 0)}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="pb-3">
          <CardDescription>Refunded Amount</CardDescription>
          <CardTitle className="text-3xl">{formatAmount(analytics.refundedAmount || 0)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <IndianRupeeIcon className="h-4 w-4" />
            <span>{analytics.refundedPayments} refunds</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
