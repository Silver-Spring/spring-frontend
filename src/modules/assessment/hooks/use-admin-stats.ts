import { useQuery } from '@apollo/client/react';
import { AdminAssessmentStatsDoc } from '../graphql';

export const useAdminStats = () => {
  const { data, loading, error, refetch } = useQuery(AdminAssessmentStatsDoc);

  return {
    stats: data?.adminAssessmentStats || null,
    loading,
    error,
    refetch,
  };
};
