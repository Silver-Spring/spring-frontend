'use client';

import { useQuery } from '@apollo/client/react';
import { AssessmentTypeStagesDoc } from '../graphql';

export const useAssessmentTypeStages = (assessmentType: string | null) => {
  const { data, loading, error, refetch } = useQuery(AssessmentTypeStagesDoc, {
    variables: { assessmentTypeCode: assessmentType ?? '' },
    skip: !assessmentType,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const stages = [...(data?.assessmentTypeStages ?? [])].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  return {
    stages,
    loading,
    error,
    refetch,
  };
};
