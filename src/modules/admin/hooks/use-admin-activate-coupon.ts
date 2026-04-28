'use client';

import { useMutation } from '@apollo/client/react';
import posthog from 'posthog-js';
import { toast } from 'sonner';
import { AdminActivateCouponDoc } from '../graphql/admin-activate-coupon.graphql';

export const useAdminActivateCoupon = () => {
  const [activateCouponMutation, { loading }] = useMutation(AdminActivateCouponDoc, {
    onCompleted: (data) => {
      if (data.adminActivateCoupon?.success) {
        posthog.capture('admin_coupon_activated');
        toast.success(data.adminActivateCoupon.message || 'Coupon activated successfully');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to activate coupon');
    },
  });

  const activateCoupon = async (id: string) => {
    try {
      const result = await activateCouponMutation({
        variables: { input: { id } },
      });
      return result.data?.adminActivateCoupon;
    } catch (error) {
      console.error('Error activating coupon:', error);
      throw error;
    }
  };

  return { activateCoupon, loading };
};
