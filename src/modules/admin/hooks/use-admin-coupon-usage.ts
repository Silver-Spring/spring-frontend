'use client';

import { useQuery } from '@apollo/client/react';
import { AdminCouponUsageDoc } from '../graphql/admin-coupon-usage.graphql';

export const useAdminCouponUsage = (couponId: string) => {
  const { data, loading, error, refetch } = useQuery(AdminCouponUsageDoc, {
    variables: { couponId },
    skip: !couponId,
    fetchPolicy: 'network-only',
  });

  const usageRecords = data?.adminCouponUsage?.usageRecords ?? [];
  const totalCount = data?.adminCouponUsage?.totalCount ?? 0;

  return {
    usageRecords,
    totalCount,
    loading,
    error,
    refetch,
  };
};
