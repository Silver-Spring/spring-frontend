'use client';

import { useMutation } from '@apollo/client/react';
import { AdminDeleteCouponDoc } from '../graphql/admin-delete-coupon.graphql';
import { toast } from 'sonner';
import posthog from 'posthog-js';

export const useAdminDeleteCoupon = () => {
  const [deleteCouponMutation, { data, loading, error }] = useMutation(AdminDeleteCouponDoc, {
    onCompleted: (data) => {
      if (data.adminDeleteCoupon?.success) {
        posthog.capture('admin_coupon_deleted', {
          coupon_id: data.adminDeleteCoupon?.deletedId,
        });
        toast.success(data.adminDeleteCoupon?.message || 'Coupon deleted successfully');
      }
    },
    onError: (error) => {
      console.error('Delete coupon error:', error);
      // Error message from backend is more informative
      toast.error(error.message || 'Failed to delete coupon');
    },
  });

  const deleteCoupon = async (id: string) => {
    const result = await deleteCouponMutation({
      variables: {
        input: { id },
      },
    });
    return result.data?.adminDeleteCoupon;
  };

  return {
    deleteCoupon,
    data: data?.adminDeleteCoupon,
    loading,
    error,
  };
};
