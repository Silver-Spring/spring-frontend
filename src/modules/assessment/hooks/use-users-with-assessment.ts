'use client';

import { useQuery } from '@apollo/client/react';
import { toAssessmentTypeQueryVariable, type AssessmentTypeFilter } from '../constants';
import { UsersWithAssessmentDoc } from '../graphql/users-with-assessment.graphql';

export const useUsersWithAssessment = (assessmentTypeFilter?: AssessmentTypeFilter) => {
  const assessmentType = assessmentTypeFilter
    ? toAssessmentTypeQueryVariable(assessmentTypeFilter)
    : undefined;

  const { data, loading, error, refetch } = useQuery(UsersWithAssessmentDoc, {
    variables: { assessmentType },
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
