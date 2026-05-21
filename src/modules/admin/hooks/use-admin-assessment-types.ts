'use client';

import { useQuery } from '@apollo/client/react';
import { AdminAssessmentTypesDoc } from '../graphql';

export const useAdminAssessmentTypes = () => {
  const { data, loading, error, refetch } = useQuery(AdminAssessmentTypesDoc, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    assessmentTypes: data?.adminAssessmentTypes ?? [],
    loading,
    error,
    refetch,
  };
};
