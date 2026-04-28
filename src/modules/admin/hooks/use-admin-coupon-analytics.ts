'use client';

import { useQuery } from '@apollo/client/react';
import { AdminCouponAnalyticsDoc } from '../graphql/admin-coupon-analytics.graphql';

export const useAdminCouponAnalytics = () => {
  const { data, loading, error, refetch } = useQuery(AdminCouponAnalyticsDoc, {
    fetchPolicy: 'network-only',
  });

  const analytics = data?.adminCouponAnalytics ?? null;

  return {
    analytics,
    loading,
    error,
    refetch,
  };
};
