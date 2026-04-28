'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { AdminDeactivateCouponDoc } from '../graphql/admin-deactivate-coupon.graphql';
import posthog from 'posthog-js';

export const useAdminDeactivateCoupon = () => {
  const [deactivateCouponMutation, { loading }] = useMutation(AdminDeactivateCouponDoc, {
    onCompleted: (data) => {
      if (data.adminDeactivateCoupon?.success) {
        posthog.capture('admin_coupon_deactivated');
        toast.success(data.adminDeactivateCoupon.message || 'Coupon deactivated successfully');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to deactivate coupon');
    },
  });

  const deactivateCoupon = async (id: string) => {
    try {
      const result = await deactivateCouponMutation({
        variables: { input: { id } },
      });
      return result.data?.adminDeactivateCoupon;
    } catch (error) {
      console.error('Error deactivating coupon:', error);
      throw error;
    }
  };

  return { deactivateCoupon, loading };
};
