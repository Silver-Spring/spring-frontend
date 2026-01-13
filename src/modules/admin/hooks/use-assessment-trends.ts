'use client';

import { useQuery } from '@apollo/client/react';
import { AssessmentTrendsDoc } from '../graphql/assessment-trends.graphql';

export const useAssessmentTrends = (days: number = 7) => {
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const { data, loading, error, refetch } = useQuery(AssessmentTrendsDoc, {
    variables: { startDate, endDate },
    fetchPolicy: 'cache-and-network',
  });

  return {
    trends: data?.assessmentTrends?.trends ?? [],
    totalCompleted: data?.assessmentTrends?.totalCompleted ?? 0,
    totalStarted: data?.assessmentTrends?.totalStarted ?? 0,
    totalInProgress: data?.assessmentTrends?.totalInProgress ?? 0,
    loading,
    error,
    refetch,
  };
};
