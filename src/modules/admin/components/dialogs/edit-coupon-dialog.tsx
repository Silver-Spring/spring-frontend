'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Spinner } from '@/components/ui/spinner';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { useAdminCouponById, useAdminUpdateCoupon } from '../../hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createEditCouponSchema, type EditCouponFormValues } from '../../schema';

interface EditCouponDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  couponId: string;
  onSuccess: () => void;
}

export const EditCouponDialog = ({
  open,
  onOpenChange,
  couponId,
  onSuccess,
}: EditCouponDialogProps) => {
  const { coupon, loading: fetchLoading } = useAdminCouponById(couponId);
  const { updateCoupon, loading: updateLoading } = useAdminUpdateCoupon();

  const form = useForm<EditCouponFormValues>({
    resolver: zodResolver(createEditCouponSchema(coupon?.currentUses || 0)),
    defaultValues: {
      description: '',
      validUntil: '',
      isActive: true,
      maxTotalUses: undefined,
    },
  });

  useEffect(() => {
    if (coupon) {
      form.reset({
        description: coupon.description || '',
        validUntil: coupon.validUntil || '',
        isActive: coupon.isActive,
        maxTotalUses: coupon.maxTotalUses || undefined,
      });
    }
  }, [coupon, form]);

  const handleSubmit = async (values: EditCouponFormValues) => {
    try {
      const input: any = {
        id: couponId,
        isActive: values.isActive,
      };

      if (values.description?.trim()) {
        input.description = values.description.trim();
      }

      // Always include validUntil, pass null if empty to clear the date
      input.validUntil = values.validUntil || null;

      input.maxTotalUses = values.maxTotalUses || null;

      await updateCoupon(input);
      onSuccess();
    } catch (error) {
      console.error('Failed to update coupon:', error);
    }
  };

  if (fetchLoading || !coupon) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Loading Coupon...</DialogTitle>
            <DialogDescription>Please wait while we load the coupon details...</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-8">
            <Spinner className="h-8 w-8" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Coupon: {coupon.code}</DialogTitle>
          <DialogDescription>
            Update coupon settings. Code and discount values cannot be changed.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormItem>
              <FormLabel>Coupon Code</FormLabel>
              <Input value={coupon.code} disabled className="font-mono bg-muted" />
              <FormDescription>Coupon code cannot be changed</FormDescription>
            </FormItem>

            <FormItem>
              <FormLabel>Discount</FormLabel>
              <Input
                value={`${coupon.discountType === 'PERCENTAGE' ? `${coupon.discountValue}%` : `₹${(coupon.discountValue / 100).toFixed(2)}`}`}
                disabled
                className="bg-muted"
              />
              <FormDescription>Discount value cannot be changed</FormDescription>
            </FormItem>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="e.g., Launch Offer - 50% off" rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="validUntil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valid Until</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select end date"
                    />
                  </FormControl>
                  <FormDescription>Leave empty for never-expiring coupon</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxTotalUses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Total Uses (Current: {coupon.currentUses})</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      min={coupon.currentUses}
                      placeholder="Leave empty for unlimited"
                      {...field}
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Active Status</FormLabel>
                    <FormDescription>Enable or disable this coupon</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateLoading}>
                {updateLoading ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Updating...
                  </>
                ) : (
                  'Update Coupon'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
