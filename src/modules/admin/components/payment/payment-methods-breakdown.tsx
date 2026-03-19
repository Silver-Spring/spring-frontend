'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatAmount } from '@/lib/payment-utils';

interface PaymentMethodBreakdown {
  method: string;
  count: number;
  totalAmount: number;
  successCount: number;
  failedCount: number;
}

interface PaymentMethodsBreakdownProps {
  breakdown: PaymentMethodBreakdown[];
}

export const PaymentMethodsBreakdown = ({ breakdown }: PaymentMethodsBreakdownProps) => {
  if (!breakdown || breakdown.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods Breakdown</CardTitle>
        <CardDescription>Performance by payment method</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Transactions</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
                <TableHead className="text-right">Success</TableHead>
                <TableHead className="text-right">Failed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {breakdown.map((method) => (
                <TableRow key={method.method}>
                  <TableCell className="font-medium capitalize">{method.method}</TableCell>
                  <TableCell className="text-right">{method.count}</TableCell>
                  <TableCell className="text-right">{formatAmount(method.totalAmount)}</TableCell>
                  <TableCell className="text-right text-green-600">{method.successCount}</TableCell>
                  <TableCell className="text-right text-red-600">{method.failedCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
