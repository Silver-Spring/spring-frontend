'use client';

import { useQuery } from '@apollo/client/react';
import { UsersWithoutAssessmentDoc } from '../graphql/users-without-assessment.graphql';

export const useUsersWithoutAssessment = () => {
  const { data, loading, error, refetch } = useQuery(UsersWithoutAssessmentDoc, {
    fetchPolicy: 'network-only',
  });

  const users = data?.usersWithoutAssessment?.users ?? [];
  const totalCount = data?.usersWithoutAssessment?.totalCount ?? 0;

  return {
    users,
    totalCount,
    loading,
    error,
    refetch,
  };
};
