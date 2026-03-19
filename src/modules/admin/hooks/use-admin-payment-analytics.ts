'use client';

import { useQuery } from '@apollo/client/react';
import { AdminPaymentAnalyticsDoc } from '../graphql/admin-payment-analytics.graphql';

interface UseAdminPaymentAnalyticsOptions {
  from?: number;
  to?: number;
}

export const useAdminPaymentAnalytics = (options?: UseAdminPaymentAnalyticsOptions) => {
  const { data, loading, error, refetch } = useQuery(AdminPaymentAnalyticsDoc, {
    variables: {
      input: options,
    },
    fetchPolicy: 'network-only',
  });

  const analytics = data?.adminPaymentAnalytics;

  return {
    analytics: analytics ?? null,
    loading,
    error,
    refetch,
  };
};
