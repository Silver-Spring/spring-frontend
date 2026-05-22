'use client';

import { useQuery } from '@apollo/client/react';
import { AssessmentTemplateContentsDoc } from '../graphql';

export const useAssessmentTemplateContents = (assessmentType: string | null) => {
  const { data, loading, error, refetch } = useQuery(AssessmentTemplateContentsDoc, {
    variables: { assessmentTypeCode: assessmentType ?? '' },
    skip: !assessmentType,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const contents = data?.assessmentTemplateContents?.nodes ?? [];

  const contentByKey = contents.reduce<Record<string, unknown>>((acc, row) => {
    acc[row.contentKey] = row.contentValue;
    return acc;
  }, {});

  return {
    contents,
    contentByKey,
    loading,
    error,
    refetch,
  };
};
