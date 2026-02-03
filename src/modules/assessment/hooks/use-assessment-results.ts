import { useQuery } from '@apollo/client/react';
import { AssessmentResultsDoc } from '../graphql';

export const useAssessmentResults = (resultId: string | null) => {
  const { data, loading, error, refetch } = useQuery(
    AssessmentResultsDoc,
    {
      variables: { id: resultId || '' },
      skip: !resultId,
      notifyOnNetworkStatusChange: true,
    }
  );

  const result = data?.assessmentResult || null;

  return {
    result,
    loading,
    error,
    refetch,
  };
};
