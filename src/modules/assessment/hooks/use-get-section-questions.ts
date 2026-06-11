import { useQuery } from '@apollo/client/react';
import { GetSectionQuestionsDoc } from '../graphql';

export const useGetSectionQuestions = (sectionId: string | null) => {
  const { data, loading, error, refetch } = useQuery(GetSectionQuestionsDoc, {
    variables: { sectionId: sectionId || '' },
    skip: !sectionId,
  });

  const nodes = data?.assessmentQuestions?.nodes || [];
  const sorted = [...nodes].sort((a, b) => a.displayOrder - b.displayOrder);

  return {
    questions: sorted,
    totalCount: data?.assessmentQuestions?.totalCount || 0,
    loading,
    error,
    refetch,
  };
};
