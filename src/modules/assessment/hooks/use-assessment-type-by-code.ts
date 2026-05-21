import { useQuery } from '@apollo/client/react';
import { AssessmentTypeByCodeDoc } from '../graphql';

export const useAssessmentTypeByCode = (code: string | null) => {
  const { data, loading, error, refetch } = useQuery(AssessmentTypeByCodeDoc, {
    variables: { code: code ?? '' },
    skip: !code,
    fetchPolicy: 'cache-and-network',
  });

  return {
    assessmentType: data?.assessmentTypeByCode ?? null,
    loading,
    error,
    refetch,
  };
};
