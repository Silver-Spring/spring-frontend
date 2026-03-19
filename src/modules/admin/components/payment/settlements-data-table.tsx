'use client';

import { useMemo } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { formatAmount, getPaymentStatusColor } from '@/lib/payment-utils';
import type { RazorpaySettlementItem } from '@/gql/graphql';

interface SettlementsDataTableProps {
  data: RazorpaySettlementItem[];
}

export const SettlementsDataTable = ({ data }: SettlementsDataTableProps) => {
  const columns: ColumnDef<RazorpaySettlementItem>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Settlement ID',
        cell: ({ row }) => (
          <div className="font-mono text-xs max-w-[150px] truncate">{row.getValue('id')}</div>
        ),
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
          const amount = row.getValue('amount') as number;
          return <div className="font-medium">{formatAmount(amount)}</div>;
        },
      },
      {
        accessorKey: 'fees',
        header: 'Fees',
        cell: ({ row }) => {
          const settlement = row.original;
          const totalFees = (settlement.fees || 0) + (settlement.tax || 0);
          return <div className="text-sm text-muted-foreground">{formatAmount(totalFees)}</div>;
        },
      },
      {
        id: 'netAmount',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Net Amount
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const settlement = row.original;
          const netAmount =
            settlement.amount - (settlement.fees || 0) - (settlement.tax || 0);
          return <div className="font-medium text-green-600">{formatAmount(netAmount)}</div>;
        },
        sortingFn: (rowA, rowB) => {
          const netA =
            rowA.original.amount - (rowA.original.fees || 0) - (rowA.original.tax || 0);
          const netB =
            rowB.original.amount - (rowB.original.fees || 0) - (rowB.original.tax || 0);
          return netA - netB;
        },
      },
      {
        accessorKey: 'utr',
        header: 'UTR',
        cell: ({ row }) => (
          <div className="font-mono text-xs max-w-[120px] truncate">
            {row.getValue('utr') || 'N/A'}
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string;
          return <Badge variant={getPaymentStatusColor(status)}>{status}</Badge>;
        },
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
    []
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      filterColumn="utr"
      filterPlaceholder="Filter by UTR..."
      emptyMessage="No settlements found."
      rowsPerPageId="rows-per-page-settlements"
    />
  );
};
