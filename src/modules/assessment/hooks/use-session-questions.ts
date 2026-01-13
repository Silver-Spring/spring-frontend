import { useQuery } from '@apollo/client/react';
import { SessionQuestionsDoc } from '../graphql';
import { useMemo } from 'react';

export const useSessionQuestions = (sessionId: string | null) => {
  const { data, loading, error, refetch } = useQuery(SessionQuestionsDoc, {
    variables: { sessionId: sessionId || '' },
    skip: !sessionId,
  });

  const session = data?.assessmentSession;

  // Sort questions by displayOrder to ensure correct sequence
  const sortedQuestions = useMemo(() => {
    const questions = session?.assessmentSessionQuestionsBySessionId?.nodes || [];
    return [...questions].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [session?.assessmentSessionQuestionsBySessionId?.nodes]);

  return {
    session: session || null,
    questions: sortedQuestions,
    previousResponses: session?.assessmentResponsesBySessionId?.nodes || [],
    currentQuestionNumber: session?.currentQuestionNumber || 1,
    loading,
    error,
    refetch,
  };
};
