'use client';

import { useMemo } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { formatAmount, getPaymentStatusColor } from '@/lib/payment-utils';
import type { RazorpayRefundItem } from '@/gql/graphql';

interface RefundsDataTableProps {
  data: RazorpayRefundItem[];
  onViewPaymentDetails: (paymentId: string) => void;
}

export const RefundsDataTable = ({ data, onViewPaymentDetails }: RefundsDataTableProps) => {
  const columns: ColumnDef<RazorpayRefundItem>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Refund ID',
        cell: ({ row }) => (
          <div className="font-mono text-xs max-w-[150px] truncate">{row.getValue('id')}</div>
        ),
      },
      {
        accessorKey: 'paymentId',
        header: 'Payment ID',
        cell: ({ row }) => {
          const paymentId = row.getValue('paymentId') as string;
          return (
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-xs font-mono"
              onClick={() => onViewPaymentDetails(paymentId)}
            >
              {paymentId}
            </Button>
          );
        },
      },
      {
        accessorKey: 'amount',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Amount
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const refund = row.original;
          return <div className="font-medium">{formatAmount(refund.amount, refund.currency)}</div>;
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string;
          return <Badge variant={getPaymentStatusColor(status)}>{status}</Badge>;
        },
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id));
        },
      },
      {
        accessorKey: 'speedRequested',
        header: 'Speed',
        cell: ({ row }) => (
          <div className="capitalize text-sm">{row.getValue('speedRequested') || 'normal'}</div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const timestamp = row.getValue('createdAt') as number;
          return (
            <div className="text-sm text-muted-foreground">
              {new Date(timestamp * 1000).toLocaleString()}
            </div>
          );
        },
        sortingFn: (rowA, rowB) => {
          const a = rowA.getValue('createdAt') as number;
          const b = rowB.getValue('createdAt') as number;
          return a - b;
        },
      },
    ],
    [onViewPaymentDetails]
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      filterColumn="paymentId"
      filterPlaceholder="Filter by payment ID..."
      emptyMessage="No refunds found."
      rowsPerPageId="rows-per-page-refunds"
    />
  );
};
