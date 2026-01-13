import { useQuery } from '@apollo/client/react';
import { AssessmentStatusDoc } from '../graphql';

export const useAssessmentStatus = () => {
  const { data, loading, error, refetch } = useQuery(AssessmentStatusDoc, {
    // Cache for 5 minutes since this data doesn't change frequently
    fetchPolicy: 'cache-and-network',
  });

  return {
    status: data?.assessmentStatus || null,
    hasCompletedAssessment: data?.assessmentStatus?.hasCompletedAssessment ?? false,
    hasActiveSession: data?.assessmentStatus?.hasActiveSession ?? false,
    completedAt: data?.assessmentStatus?.completedAt || null,
    resultId: data?.assessmentStatus?.resultId || null,
    totalReadinessIndex: data?.assessmentStatus?.totalReadinessIndex || null,
    loading,
    error,
    refetch,
  };
};
