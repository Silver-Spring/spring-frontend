import { useMutation } from '@apollo/client/react';
import { ValidateCouponDoc } from '../graphql/validate-coupon.graphql';
import type { ValidateCouponInput } from '@/gql/graphql';

export const useValidateCoupon = () => {
  const [validateCouponMutation, { data, loading, error }] = useMutation(ValidateCouponDoc);

  const validateCoupon = async (code: string) => {
    const input: ValidateCouponInput = {
      code: code.trim().toUpperCase(),
    };

    const result = await validateCouponMutation({
      variables: { input },
    });

    return result.data?.validateCoupon;
  };

  return {
    validateCoupon,
    data: data?.validateCoupon,
    loading,
    error,
  };
};
