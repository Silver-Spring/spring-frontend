import { useQuery } from '@apollo/client/react';
import {
  AssessmentTypeCode,
  DEFAULT_ASSESSMENT_TYPE,
} from '../constants';
import { AssessmentStatusDoc } from '../graphql';

export const useAssessmentStatus = (
  assessmentType: AssessmentTypeCode = DEFAULT_ASSESSMENT_TYPE
) => {
  const { data, loading, error, refetch } = useQuery(AssessmentStatusDoc, {
    variables: { assessmentType },
    fetchPolicy: 'cache-and-network',
  });

  return {
    status: data?.assessmentStatus || null,
    hasCompletedAssessment: data?.assessmentStatus?.hasCompletedAssessment ?? false,
    hasActiveSession: data?.assessmentStatus?.hasActiveSession ?? false,
    completedAt: data?.assessmentStatus?.completedAt || null,
    resultId: data?.assessmentStatus?.resultId || null,
    totalReadinessIndex: data?.assessmentStatus?.totalReadinessIndex || null,
    completedAssessments: data?.assessmentStatus?.completedAssessments ?? [],
    availableAssessments: data?.assessmentStatus?.availableAssessments ?? [],
    loading,
    error,
    refetch,
  };
};
