'use client';

import { useQuery } from '@apollo/client/react';
import { AssessmentTypeReadinessDoc } from '../graphql';

export const useAssessmentTypeReadiness = (assessmentType: string | null) => {
  const { data, loading, error, refetch } = useQuery(AssessmentTypeReadinessDoc, {
    variables: { type: assessmentType ?? '' },
    skip: !assessmentType,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const readiness = data?.assessmentTypeReadiness ?? null;

  return {
    readiness,
    ready: readiness?.ready ?? false,
    checks: readiness?.checks ?? [],
    loading,
    error,
    refetch,
  };
};

export type AssessmentTypeReadinessCheckKey =
  | 'sections'
  | 'questions'
  | 'section_bands'
  | 'overall_bands'
  | 'section_band_coverage';
