import { useQuery } from '@apollo/client/react';
import { GetAssessmentResultDoc } from '../graphql/assessment-results.graphql';

export const useAssessmentResults = (resultId: string | null) => {
  const { data, loading, error, refetch } = useQuery(
    GetAssessmentResultDoc,
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
