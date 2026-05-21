import { useQuery } from '@apollo/client/react';
import { AvailableAssessmentsDoc } from '../graphql';

export const useAvailableAssessments = () => {
  const { data, loading, error, refetch } = useQuery(AvailableAssessmentsDoc, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    assessments: data?.availableAssessments ?? [],
    loading,
    error,
    refetch,
  };
};
