'use client';

import { useQuery } from '@apollo/client/react';
import { AdminWorkbookPurchasesDoc } from '../graphql/admin-workbook-purchases.graphql';

interface UseAdminWorkbookPurchasesOptions {
  status?: string;
  search?: string;
  from?: number;
  to?: number;
  skip?: number;
  count?: number;
}

export const useAdminWorkbookPurchases = (options?: UseAdminWorkbookPurchasesOptions) => {
  const { data, loading, error, refetch } = useQuery(AdminWorkbookPurchasesDoc, {
    variables: { input: options },
    fetchPolicy: 'network-only',
  });

  return {
    purchases: data?.adminWorkbookPurchases?.items ?? [],
    totalCount: data?.adminWorkbookPurchases?.totalCount ?? 0,
    loading,
    error,
    refetch,
  };
};
