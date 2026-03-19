'use client';

import { useQuery } from '@apollo/client/react';
import { AdminSettlementsListDoc } from '../graphql/admin-settlements-list.graphql';

interface UseAdminSettlementsListOptions {
  from?: number;
  to?: number;
  count?: number;
  skip?: number;
}

export const useAdminSettlementsList = (options?: UseAdminSettlementsListOptions) => {
  const { data, loading, error, refetch } = useQuery(AdminSettlementsListDoc, {
    variables: {
      input: options,
    },
    fetchPolicy: 'network-only',
  });

  const settlements = data?.adminSettlementsList?.items ?? [];
  const totalCount = data?.adminSettlementsList?.count ?? 0;

  return {
    settlements,
    totalCount,
    loading,
    error,
    refetch,
  };
};
