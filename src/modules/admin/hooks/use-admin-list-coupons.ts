'use client';

import { useQuery } from '@apollo/client/react';
import { AdminListCouponsDoc } from '../graphql/admin-list-coupons.graphql';

export const useAdminListCoupons = () => {
  const { data, loading, error, refetch } = useQuery(AdminListCouponsDoc, {
    fetchPolicy: 'network-only',
  });

  const coupons = data?.adminListCoupons?.coupons ?? [];
  const totalCount = data?.adminListCoupons?.totalCount ?? 0;

  return {
    coupons,
    totalCount,
    loading,
    error,
    refetch,
  };
};
