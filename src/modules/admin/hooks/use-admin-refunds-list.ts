'use client';

import { useQuery } from '@apollo/client/react';
import { AdminRefundsListDoc } from '../graphql/admin-refunds-list.graphql';

interface UseAdminRefundsListOptions {
  from?: number;
  to?: number;
  count?: number;
  skip?: number;
}

export const useAdminRefundsList = (options?: UseAdminRefundsListOptions) => {
  const { data, loading, error, refetch } = useQuery(AdminRefundsListDoc, {
    variables: {
      input: options,
    },
    fetchPolicy: 'network-only',
  });

  const refunds = data?.adminRefundsList?.items ?? [];
  const totalCount = data?.adminRefundsList?.count ?? 0;

  return {
    refunds,
    totalCount,
    loading,
    error,
    refetch,
  };
};
