'use client';

import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { toAssessmentTypeQueryVariable, type AssessmentTypeFilter } from '@/modules/assessment/constants';
import { AssessmentTrendsDoc } from '../graphql/assessment-trends.graphql';

export const useAssessmentTrends = (
  days: number = 7,
  assessmentTypeFilter?: AssessmentTypeFilter
) => {
  const { endDate, startDate } = useMemo(() => {
    const now = new Date();
    const end = now.toISOString().split('T')[0];
    const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    return { endDate: end, startDate: start };
  }, [days]);

  const assessmentType = assessmentTypeFilter
    ? toAssessmentTypeQueryVariable(assessmentTypeFilter)
    : undefined;

  const { data, loading, error, refetch } = useQuery(AssessmentTrendsDoc, {
    variables: { startDate, endDate, assessmentType },
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
