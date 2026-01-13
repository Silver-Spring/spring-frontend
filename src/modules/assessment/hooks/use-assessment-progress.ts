import { useQuery } from '@apollo/client/react';
import { AssessmentProgressDoc } from '../graphql';

export const useAssessmentProgress = () => {
  const { data, loading, error, refetch } = useQuery(AssessmentProgressDoc);

  return {
    progress: data?.assessmentProgress || null,
    loading,
    error,
    refetch,
  };
};
