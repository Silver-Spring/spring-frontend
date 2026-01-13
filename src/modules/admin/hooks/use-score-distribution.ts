'use client';

import { useQuery } from '@apollo/client/react';
import { ScoreDistributionDoc } from '../graphql/score-distribution.graphql';

export const useScoreDistribution = () => {
  const { data, loading, error, refetch } = useQuery(ScoreDistributionDoc, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    distribution: data?.scoreDistribution?.distribution ?? [],
    totalAssessments: data?.scoreDistribution?.totalAssessments ?? 0,
    averageScore: data?.scoreDistribution?.averageScore ?? 0,
    loading,
    error,
    refetch,
  };
};
