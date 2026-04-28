'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { AdminUpdateCouponDoc } from '../graphql/admin-update-coupon.graphql';
import posthog from 'posthog-js';

export const useAdminUpdateCoupon = () => {
  const [updateCouponMutation, { loading }] = useMutation(AdminUpdateCouponDoc, {
    onCompleted: (data) => {
      if (data.adminUpdateCoupon?.success) {
        posthog.capture('admin_coupon_updated', {
          coupon_id: data.adminUpdateCoupon.coupon?.id,
          coupon_code: data.adminUpdateCoupon.coupon?.code,
        });
        toast.success(data.adminUpdateCoupon.message || 'Coupon updated successfully');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update coupon');
    },
  });

  const updateCoupon = async (input: {
    id: string;
    description?: string;
    validUntil?: string;
    isActive?: boolean;
    maxTotalUses?: number;
  }) => {
    try {
      const result = await updateCouponMutation({
        variables: { input },
      });
      return result.data?.adminUpdateCoupon;
    } catch (error) {
      console.error('Error updating coupon:', error);
      throw error;
    }
  };

  return { updateCoupon, loading };
};
