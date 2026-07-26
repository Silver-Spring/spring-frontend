'use client';

import { useQuery } from '@apollo/client/react';
import { AdminWorkbookStatsDoc } from '../graphql/admin-workbook-stats.graphql';

export const useAdminWorkbookStats = () => {
  const { data, loading, error, refetch } = useQuery(AdminWorkbookStatsDoc, {
    fetchPolicy: 'network-only',
  });

  return {
    stats: data?.adminWorkbookStats ?? null,
    loading,
    error,
    refetch,
  };
};
