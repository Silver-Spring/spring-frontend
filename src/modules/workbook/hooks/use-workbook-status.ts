import { useQuery } from '@apollo/client/react';
import { WorkbookStatusDoc } from '../graphql';

export const useWorkbookStatus = (skip = false) => {
  const { data, loading, error, refetch } = useQuery(WorkbookStatusDoc, {
    skip,
    fetchPolicy: 'cache-and-network',
  });

  return {
    hasPurchased: data?.currentUserWorkbookStatus?.hasPurchased ?? false,
    purchasedAt: data?.currentUserWorkbookStatus?.purchasedAt ?? null,
    purchaseId: data?.currentUserWorkbookStatus?.purchaseId ?? null,
    loading,
    error,
    refetch,
  };
};
