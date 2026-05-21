import { useQuery } from '@apollo/client/react';
import {
  AssessmentTypeCode,
  DEFAULT_ASSESSMENT_TYPE,
} from '../constants';
import { AdminAssessmentStatsDoc } from '../graphql';

export const useAdminStats = (
  assessmentType: AssessmentTypeCode = DEFAULT_ASSESSMENT_TYPE
) => {
  const { data, loading, error, refetch } = useQuery(AdminAssessmentStatsDoc, {
    variables: { assessmentType },
  });

  return {
    stats: data?.adminAssessmentStats || null,
    loading,
    error,
    refetch,
  };
};
