'use client';

import { useQuery } from '@apollo/client/react';
import { AdminPaymentsListDoc } from '../graphql/admin-payments-list.graphql';

interface UseAdminPaymentsListOptions {
  from?: number;
  to?: number;
  count?: number;
  skip?: number;
}

export const useAdminPaymentsList = (options?: UseAdminPaymentsListOptions) => {
  const { data, loading, error, refetch } = useQuery(AdminPaymentsListDoc, {
    variables: {
      input: options,
    },
    fetchPolicy: 'network-only',
  });

  const payments = data?.adminPaymentsList?.items ?? [];
  const totalCount = data?.adminPaymentsList?.count ?? 0;

  return {
    payments,
    totalCount,
    loading,
    error,
    refetch,
  };
};
