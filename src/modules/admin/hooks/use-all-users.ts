'use client';

import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { AllUsersDoc } from '../graphql/all-users.graphql';

export const useAllUsers = () => {
  const { data, loading, error, refetch } = useQuery(AllUsersDoc, {
    fetchPolicy: 'network-only',
  });

  const users = data?.allUsers?.users ?? [];
  const totalCount = data?.allUsers?.totalCount ?? 0;
  const adminCount = data?.allUsers?.adminCount ?? 0;

  // Calculate regular user count
  const regularUserCount = useMemo(() => {
    return totalCount - adminCount;
  }, [totalCount, adminCount]);

  // Calculate users created this month
  const newThisMonth = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return users.filter((user: any) => {
      const createdDate = new Date(user.createdAt);
      return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear;
    }).length;
  }, [users]);

  return {
    users,
    totalCount,
    adminCount,
    regularUserCount,
    newThisMonth,
    loading,
    error,
    refetch,
  };
};
