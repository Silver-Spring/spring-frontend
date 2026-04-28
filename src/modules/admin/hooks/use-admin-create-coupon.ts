'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { AdminCreateCouponDoc } from '../graphql/admin-create-coupon.graphql';
import { CreateCouponInput } from '@/gql/graphql';
import posthog from 'posthog-js';

export const useAdminCreateCoupon = () => {
  const [createCouponMutation, { loading }] = useMutation(AdminCreateCouponDoc, {
    onCompleted: (data) => {
      if (data.adminCreateCoupon?.success) {
        posthog.capture('admin_coupon_created', {
          coupon_id: data.adminCreateCoupon.coupon?.id,
          coupon_code: data.adminCreateCoupon.coupon?.code,
          discount_type: data.adminCreateCoupon.coupon?.discountType,
          discount_value: data.adminCreateCoupon.coupon?.discountValue,
        });
        toast.success(data.adminCreateCoupon.message || 'Coupon created successfully');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create coupon');
    },
  });

  const createCoupon = async (input: CreateCouponInput) => {
    try {
      const result = await createCouponMutation({
        variables: { input },
      });
      return result.data?.adminCreateCoupon;
    } catch (error) {
      console.error('Error creating coupon:', error);
      throw error;
    }
  };

  return { createCoupon, loading };
};
