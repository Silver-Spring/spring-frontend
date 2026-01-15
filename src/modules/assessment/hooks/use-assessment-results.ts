import { useQuery } from '@apollo/client/react';
import { AssessmentResultsDoc } from '../graphql';

export const useAssessmentResults = (resultId: string | null) => {
  const { data, loading, error, refetch, startPolling, stopPolling } = useQuery(
    AssessmentResultsDoc,
    {
      variables: { id: resultId || '' },
      skip: !resultId,
      pollInterval: 3000,
      notifyOnNetworkStatusChange: true,
    }
  );

  const result = data?.assessmentResult || null;

  if (result?.pdfPath && stopPolling) {
    stopPolling();
  }

  return {
    result,
    loading,
    error,
    refetch,
    startPolling,
    stopPolling,
  };
};
