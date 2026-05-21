import { useQuery } from '@apollo/client/react';
import {
  AssessmentTypeCode,
  DEFAULT_ASSESSMENT_TYPE,
} from '../constants';
import { AssessmentProgressDoc } from '../graphql';

export const useAssessmentProgress = (
  assessmentType: AssessmentTypeCode = DEFAULT_ASSESSMENT_TYPE
) => {
  const { data, loading, error, refetch } = useQuery(AssessmentProgressDoc, {
    variables: { assessmentType },
  });

  return {
    progress: data?.assessmentProgress || null,
    loading,
    error,
    refetch,
  };
};
