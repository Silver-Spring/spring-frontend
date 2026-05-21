'use client';

import { useQuery } from '@apollo/client/react';
import {
  AssessmentTypeCode,
  DEFAULT_ASSESSMENT_TYPE,
} from '@/modules/assessment/constants';
import { ScoreDistributionDoc } from '../graphql/score-distribution.graphql';

export const useScoreDistribution = (
  assessmentType: AssessmentTypeCode = DEFAULT_ASSESSMENT_TYPE
) => {
  const { data, loading, error, refetch } = useQuery(ScoreDistributionDoc, {
    variables: { assessmentType },
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
