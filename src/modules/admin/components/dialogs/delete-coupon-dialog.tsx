'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Info } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

interface DeleteCouponDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  couponCode: string;
  currentUses: number;
  loading?: boolean;
}

export const DeleteCouponDialog = ({
  open,
  onOpenChange,
  onConfirm,
  couponCode,
  currentUses,
  loading = false,
}: DeleteCouponDialogProps) => {
  const hasBeenUsed = currentUses > 0;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Delete Coupon "{couponCode}"?
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            {hasBeenUsed ? (
              <Alert variant="destructive" className="border-red-600 bg-red-50 dark:bg-red-950">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-900 dark:text-red-100">
                  <strong>Warning:</strong> This coupon has been used {currentUses} time(s). 
                  Deletion may fail if it's referenced by payments.
                  <div className="mt-2">
                    <strong>Recommended:</strong> Use <em>Deactivate</em> instead to preserve 
                    usage history and maintain data integrity.
                  </div>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-blue-900 dark:text-blue-100">
                  This coupon has not been used yet. It's safe to delete.
                </AlertDescription>
              </Alert>
            )}

            <div className="text-sm text-muted-foreground space-y-2">
              <div>
                <strong>Important:</strong>
              </div>
              <ul className="space-y-1 list-disc list-inside">
                <li>This action cannot be undone</li>
                <li>Cannot delete coupons referenced by payments</li>
                <li>All coupon data will be permanently removed</li>
              </ul>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? (
              <>
                <Spinner className="h-4 w-4 mr-2" />
                Deleting...
              </>
            ) : (
              'Delete Coupon'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
