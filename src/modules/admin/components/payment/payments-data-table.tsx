'use client';

import { useMemo } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Copy, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTable } from '@/components/ui/data-table';
import { formatAmount, getPaymentStatusColor } from '@/lib/payment-utils';
import type { RazorpayPaymentItem } from '@/gql/graphql';

interface PaymentsDataTableProps {
  data: RazorpayPaymentItem[];
  onViewDetails: (paymentId: string) => void;
}

export const PaymentsDataTable = ({ data, onViewDetails }: PaymentsDataTableProps) => {
  const columns: ColumnDef<RazorpayPaymentItem>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Payment ID',
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
          const payment = row.original;
          return (
            <div className="font-medium">{formatAmount(payment.amount, payment.currency)}</div>
          );
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
        accessorKey: 'method',
        header: 'Method',
        cell: ({ row }) => <div className="capitalize">{row.getValue('method') || 'N/A'}</div>,
      },
      {
        accessorKey: 'email',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Email
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="text-sm text-muted-foreground max-w-[200px] truncate">
            {row.getValue('email') || 'N/A'}
          </div>
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
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          const payment = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onViewDetails(payment.id)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Payment ID
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [onViewDetails]
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      filterColumn="email"
      filterPlaceholder="Filter by email..."
      emptyMessage="No payments found."
      rowsPerPageId="rows-per-page-payments"
    />
  );
};
