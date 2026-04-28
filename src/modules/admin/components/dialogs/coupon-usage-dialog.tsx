'use client';

import { DataTable } from '@/components/ui/data-table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { formatAmount } from '@/lib/payment-utils';
import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { useAdminCouponUsage } from '../../hooks';

interface CouponUsageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  couponId: string;
}

interface UsageRecord {
  id: string;
  userName: string | null;
  userEmail: string;
  discountAmount: number;
  usedAt: string;
}

export const CouponUsageDialog = ({ open, onOpenChange, couponId }: CouponUsageDialogProps) => {
  const { usageRecords, totalCount, loading } = useAdminCouponUsage(couponId);

  const columns: ColumnDef<UsageRecord>[] = useMemo(
    () => [
      {
        accessorKey: 'userName',
        header: 'User',
        cell: ({ row }) => (
          <div className="flex flex-col min-w-[150px]">
            <span className="font-medium">{row.original.userName || 'N/A'}</span>
            <span className="text-sm text-muted-foreground truncate max-w-[200px] md:max-w-none">
              {row.original.userEmail}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'discountAmount',
        header: 'Discount',
        cell: ({ row }) => (
          <span className="font-medium text-green-600 whitespace-nowrap">
            {formatAmount(row.original.discountAmount)}
          </span>
        ),
      },
      {
        accessorKey: 'usedAt',
        header: 'Used At',
        cell: ({ row }) => (
          <div className="text-sm whitespace-nowrap">
            <span className="hidden md:inline">
              {format(new Date(row.original.usedAt), 'MMM dd, yyyy hh:mm a')}
            </span>
            <span className="md:hidden">{format(new Date(row.original.usedAt), 'MMM dd, yy')}</span>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] md:max-w-5xl max-h-[90vh] p-0 flex flex-col gap-0">
        <div className="px-6 pt-6">
          <DialogHeader>
            <DialogTitle>Coupon Usage History</DialogTitle>
            <DialogDescription>
              Users who have redeemed this coupon ({totalCount} total)
            </DialogDescription>
          </DialogHeader>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8 px-6">
            <Spinner className="h-8 w-8" />
          </div>
        ) : (
          <div className="mt-4 overflow-y-auto flex-1 px-6 pb-6">
            {usageRecords.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No usage records found. This coupon hasn't been used yet.
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={usageRecords as any}
                filterColumn="userName"
                filterPlaceholder="Search by user name..."
              />
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
