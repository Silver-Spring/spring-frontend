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

  // Calculate internal user count (excluding admins as they are always internal)
  const internalUserCount = useMemo(() => {
    return users.filter((user: any) => user.isInternal && !user.isAdmin).length;
  }, [users]);

  // Calculate regular user count (not admin and not internal)
  const regularUserCount = useMemo(() => {
    return users.filter((user: any) => !user.isAdmin && !user.isInternal).length;
  }, [users]);

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
    internalUserCount,
    regularUserCount,
    newThisMonth,
    loading,
    error,
    refetch,
  };
};
