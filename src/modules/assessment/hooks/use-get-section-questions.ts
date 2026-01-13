import { useQuery } from '@apollo/client/react';
import { GetSectionQuestionsDoc } from '../graphql';

export const useGetSectionQuestions = (sectionId: string | null) => {
  const { data, loading, error, refetch } = useQuery(GetSectionQuestionsDoc, {
    variables: { sectionId: sectionId || '' },
    skip: !sectionId,
  });

  return {
    questions: data?.assessmentQuestions?.nodes || [],
    totalCount: data?.assessmentQuestions?.totalCount || 0,
    loading,
    error,
    refetch,
  };
};
