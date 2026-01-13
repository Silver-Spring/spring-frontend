import { useQuery } from '@apollo/client/react';
import { AssessmentResultsDoc } from '../graphql';

export const useAssessmentResults = (resultId: string | null) => {
  const { data, loading, error, refetch } = useQuery(AssessmentResultsDoc, {
    variables: { id: resultId || '' },
    skip: !resultId,
  });

  return {
    result: data?.assessmentResult || null,
    loading,
    error,
    refetch,
  };
};
