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
  const usersWithoutAssessmentCount = data?.allUsers?.usersWithoutAssessmentCount ?? 0;

  // Calculate internal user count (excluding admins as they are always internal)
  const internalUserCount = useMemo(() => {
    return users.filter((user: any) => user.isInternal && !user.isAdmin).length;
  }, [users]);

  // Calculate regular user count (not admin and not internal)
  const regularUserCount = useMemo(() => {
    return users.filter((user: any) => !user.isAdmin && !user.isInternal).length;
  }, [users]);

  return {
    users,
    totalCount,
    adminCount,
    internalUserCount,
    regularUserCount,
    usersWithoutAssessmentCount,
    loading,
    error,
    refetch,
  };
};
