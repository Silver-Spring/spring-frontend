'use client';

import { useQuery } from '@apollo/client/react';
import { UsersWithAssessmentDoc } from '../graphql/users-with-assessment.graphql';

export const useUsersWithAssessment = () => {
  const { data, loading, error, refetch } = useQuery(UsersWithAssessmentDoc, {
    fetchPolicy: 'network-only',
  });

  return {
    users: data?.usersWithAssessment?.users ?? [],
    totalCount: data?.usersWithAssessment?.totalCount ?? 0,
    completedCount: data?.usersWithAssessment?.completedCount ?? 0,
    inProgressCount: data?.usersWithAssessment?.inProgressCount ?? 0,
    loading,
    error,
    refetch,
  };
};
