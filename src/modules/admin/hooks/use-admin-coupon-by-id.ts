'use client';

import { useQuery } from '@apollo/client/react';
import { AdminCouponByIdDoc } from '../graphql/admin-coupon-by-id.graphql';

export const useAdminCouponById = (id: string) => {
  const { data, loading, error, refetch } = useQuery(AdminCouponByIdDoc, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only',
  });

  const coupon = data?.adminCouponById ?? null;

  return {
    coupon,
    loading,
    error,
    refetch,
  };
};
