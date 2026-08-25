'use client';

import { useMemo } from 'react';
import { type ColumnDef, type Row, type StockFeatures } from '@tanstack/react-table';
import { ArrowUpDown, Copy, Eye, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatAmount, getPaymentStatusColor } from '@/lib/payment-utils';
import type { AdminWorkbookPurchaseItem } from '@/gql/schema-types';

interface WorkbookPurchasesDataTableProps {
  data: AdminWorkbookPurchaseItem[];
  onViewDetails: (purchase: AdminWorkbookPurchaseItem) => void;
}

const WORKBOOK_STATUS_LABELS: Record<string, string> = {
  captured: 'Captured',
  created: 'Pending',
  failed: 'Failed',
};

export const WorkbookPurchasesDataTable = ({
  data,
  onViewDetails,
}: WorkbookPurchasesDataTableProps) => {
  const columns: ColumnDef<StockFeatures, AdminWorkbookPurchaseItem>[] = useMemo(
    () => [
      {
        id: 'buyer',
        accessorFn: (row) => `${row.userName ?? ''} ${row.userEmail}`.trim(),
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Buyer
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="min-w-0 max-w-55">
            <p className="font-medium truncate">{row.original.userName || 'Unnamed user'}</p>
            <p className="text-xs text-muted-foreground truncate">{row.original.userEmail}</p>
          </div>
        ),
      },
      {
        accessorKey: 'userPhone',
        header: 'Phone',
        cell: ({ row }) => (
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            {row.original.userPhone || '—'}
          </div>
        ),
      },
      {
        accessorKey: 'amountInr',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const purchase = row.original;
          const hasDiscount = purchase.discountAmountInr > 0 && purchase.originalAmountInr != null;

          if (purchase.isFree) {
            return (
              <div>
                <Badge variant="secondary">Free</Badge>
                {hasDiscount ? (
                  <p className="text-xs text-muted-foreground line-through mt-1">
                    {formatAmount(purchase.originalAmountInr ?? 0)}
                  </p>
                ) : null}
              </div>
            );
          }

          return (
            <div>
              <p className="font-medium">{formatAmount(purchase.amountInr)}</p>
              {hasDiscount ? (
                <p className="text-xs text-muted-foreground">
                  <span className="line-through">
                    {formatAmount(purchase.originalAmountInr ?? 0)}
                  </span>{' '}
                  · {formatAmount(purchase.discountAmountInr)} off
                </p>
              ) : null}
            </div>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string;
          return (
            <Badge variant={getPaymentStatusColor(status)}>
              {WORKBOOK_STATUS_LABELS[status] ?? status}
            </Badge>
          );
        },
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: 'couponCode',
        header: 'Coupon',
        cell: ({ row }) =>
          row.original.couponCode ? (
            <Badge variant="outline" className="font-mono text-xs uppercase">
              {row.original.couponCode}
            </Badge>
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          ),
      },
      {
        accessorKey: 'paymentMethod',
        header: 'Method',
        cell: ({ row }) => (
          <div className="capitalize text-sm">{row.original.paymentMethod || '—'}</div>
        ),
      },
      {
        accessorKey: 'razorpayOrderId',
        header: 'Order ID',
        cell: ({ row }) => (
          <div className="font-mono text-xs text-muted-foreground max-w-37.5 truncate">
            {row.original.razorpayOrderId || '—'}
          </div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            {new Date(row.original.createdAt).toLocaleString()}
          </div>
        ),
        sortingFn: (rowA: Row<StockFeatures, AdminWorkbookPurchaseItem>, rowB: Row<StockFeatures, AdminWorkbookPurchaseItem>) =>
          Date.parse(rowA.original.createdAt) - Date.parse(rowB.original.createdAt),
      },
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          const purchase = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open purchase actions">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onViewDetails(purchase)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(purchase.userEmail)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Buyer Email
                </DropdownMenuItem>
                {purchase.razorpayOrderId ? (
                  <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(purchase.razorpayOrderId ?? '')}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Order ID
                  </DropdownMenuItem>
                ) : null}
                {purchase.razorpayPaymentId ? (
                  <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(purchase.razorpayPaymentId ?? '')}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Payment ID
                  </DropdownMenuItem>
                ) : null}
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
      filterColumn="buyer"
      filterPlaceholder="Search by buyer name or email..."
      emptyMessage="No workbook purchases found."
      rowsPerPageId="rows-per-page-workbook-purchases"
    />
  );
};
