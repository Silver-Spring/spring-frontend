'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import {
  calculateUsageProgress,
  formatCouponUsage,
  formatDiscountValue,
  getCouponStatus,
} from '@/lib/coupon-utils';
import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown, CheckCircle, Edit, Eye, MoreHorizontal, Trash2, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  useAdminActivateCoupon,
  useAdminDeactivateCoupon,
  useAdminDeleteCoupon,
} from '../../hooks';
import { CouponUsageDialog } from '../dialogs/coupon-usage-dialog';
import { EditCouponDialog } from '../dialogs/edit-coupon-dialog';
import { DeleteCouponDialog } from '../dialogs/delete-coupon-dialog';

interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discountType: string;
  discountValue: number;
  maxDiscountAmount: number | null;
  validFrom: string;
  validUntil: string | null;
  isActive: boolean;
  maxTotalUses: number | null;
  currentUses: number;
  createdAt: string;
  updatedAt: string;
}

interface CouponsDataTableProps {
  coupons: Coupon[];
  onRefetch: () => void;
}

export const CouponsDataTable = ({ coupons, onRefetch }: CouponsDataTableProps) => {
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showUsageDialog, setShowUsageDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const { deactivateCoupon, loading: deactivating } = useAdminDeactivateCoupon();
  const { activateCoupon, loading: activating } = useAdminActivateCoupon();
  const { deleteCoupon, loading: deleting } = useAdminDeleteCoupon();

  const handleActivate = async (id: string) => {
    try {
      await activateCoupon(id);
      onRefetch();
    } catch (error) {
      console.error('Failed to activate coupon:', error);
    }
  };
  const handleDeactivate = async (id: string) => {
    try {
      await deactivateCoupon(id);
      onRefetch();
    } catch (error) {
      console.error('Failed to deactivate coupon:', error);
    }
  };

  const handleEdit = (couponId: string) => {
    setSelectedCouponId(couponId);
    setShowEditDialog(true);
  };

  const handleViewUsage = (couponId: string) => {
    setSelectedCouponId(couponId);
    setShowUsageDialog(true);
  };

  const handleDelete = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCoupon) return;

    try {
      await deleteCoupon(selectedCoupon.id);
      setShowDeleteDialog(false);
      setSelectedCoupon(null);
      onRefetch();
    } catch (error) {
      console.error('Failed to delete coupon:', error);
    }
  };

  const handleDialogClose = () => {
    setShowEditDialog(false);
    setShowUsageDialog(false);
    setSelectedCouponId(null);
    onRefetch();
  };

  const handleDeleteDialogClose = () => {
    setShowDeleteDialog(false);
    setSelectedCoupon(null);
  };

  const columns: ColumnDef<Coupon>[] = useMemo(
    () => [
      {
        accessorKey: 'code',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Code
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-mono font-semibold">{row.original.code}</span>
            {row.original.description && (
              <span className="text-xs text-muted-foreground">{row.original.description}</span>
            )}
          </div>
        ),
      },
      {
        accessorKey: 'discountType',
        header: 'Discount',
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-medium">
              {formatDiscountValue(row.original.discountType, row.original.discountValue)}
            </span>
            <span className="text-xs text-muted-foreground">
              {row.original.discountType === 'PERCENTAGE' ? 'Percentage' : 'Flat Amount'}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'currentUses',
        header: 'Usage',
        cell: ({ row }) => {
          const progress = calculateUsageProgress(
            row.original.currentUses,
            row.original.maxTotalUses
          );
          return (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">
                  {formatCouponUsage(row.original.currentUses, row.original.maxTotalUses)}
                </span>
              </div>
              {row.original.maxTotalUses !== null && (
                <Progress value={progress} className="h-1.5" />
              )}
            </div>
          );
        },
      },
      {
        accessorKey: 'isActive',
        header: 'Status',
        cell: ({ row }) => {
          const status = getCouponStatus(
            row.original.isActive,
            row.original.validFrom,
            row.original.validUntil,
            row.original.currentUses,
            row.original.maxTotalUses
          );
          return <Badge variant={status.variant}>{status.label}</Badge>;
        },
        filterFn: (row, id, value) => {
          const status = getCouponStatus(
            row.original.isActive,
            row.original.validFrom,
            row.original.validUntil,
            row.original.currentUses,
            row.original.maxTotalUses
          );
          return value.includes(status.status);
        },
      },
      {
        accessorKey: 'validUntil',
        header: 'Expires',
        cell: ({ row }) => {
          if (!row.original.validUntil) {
            return <span className="text-muted-foreground">Never</span>;
          }
          return (
            <span className="text-sm">
              {format(new Date(row.original.validUntil), 'MMM dd, yyyy')}
            </span>
          );
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const coupon = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleViewUsage(coupon.id)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Usage
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEdit(coupon.id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Coupon
                </DropdownMenuItem>
                {coupon.isActive ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDeactivate(coupon.id)}
                      variant="destructive"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Deactivate
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleActivate(coupon.id)}
                      className="text-primary"
                    >
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      Activate
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDelete(coupon)} variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [deactivating, activating, deleting]
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={coupons}
        filterColumn="code"
        filterPlaceholder="Search coupons..."
      />

      {selectedCouponId && (
        <>
          <EditCouponDialog
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            couponId={selectedCouponId}
            onSuccess={handleDialogClose}
          />
          <CouponUsageDialog
            open={showUsageDialog}
            onOpenChange={setShowUsageDialog}
            couponId={selectedCouponId}
          />
        </>
      )}

      {selectedCoupon && (
        <DeleteCouponDialog
          open={showDeleteDialog}
          onOpenChange={handleDeleteDialogClose}
          onConfirm={handleConfirmDelete}
          couponCode={selectedCoupon.code}
          currentUses={selectedCoupon.currentUses}
          loading={deleting}
        />
      )}
    </>
  );
};
