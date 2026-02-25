'use client';

import { useApolloClient, useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { GetSessionQuestionDoc } from '../graphql/get-session-question.graphql';

interface UseSessionQuestionOptions {
  sessionId: string;
  questionNumber: number;
  enablePrefetch?: boolean;
  skip?: boolean;
}

export const useSessionQuestion = ({
  sessionId,
  questionNumber,
  enablePrefetch = true,
  skip = false,
}: UseSessionQuestionOptions) => {
  const client = useApolloClient();

  const { data, loading, error, refetch, previousData } = useQuery(
    GetSessionQuestionDoc,
    {
      variables: { sessionId, questionNumber },
      skip: skip || !sessionId || questionNumber < 1 || questionNumber > 50,
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: false,
      returnPartialData: true,
    }
  );

  useEffect(() => {
    if (!enablePrefetch || !data?.getSessionQuestion?.navigation?.hasNext) {
      return;
    }

    const nextQuestionNumber = data.getSessionQuestion.navigation.nextNumber;

    if (nextQuestionNumber && nextQuestionNumber <= 50) {
      client.query({
        query: GetSessionQuestionDoc,
        variables: { sessionId, questionNumber: nextQuestionNumber },
        fetchPolicy: 'cache-first',
      }).catch((error) => {
        console.warn('Prefetch failed for question', nextQuestionNumber, error);
      });
    }
  }, [
    enablePrefetch,
    data?.getSessionQuestion?.navigation?.hasNext,
    data?.getSessionQuestion?.navigation?.nextNumber,
    sessionId,
    client,
  ]);

  const currentData = data || previousData;

  return {
    question: currentData?.getSessionQuestion?.question || null,

    currentResponse: currentData?.getSessionQuestion?.currentResponse || null,

    navigation: currentData?.getSessionQuestion?.navigation || {
      currentNumber: questionNumber,
      totalQuestions: 50,
      hasPrevious: questionNumber > 1,
      hasNext: questionNumber < 50,
      previousNumber: questionNumber > 1 ? questionNumber - 1 : null,
      nextNumber: questionNumber < 50 ? questionNumber + 1 : null,
    },

    progress: currentData?.getSessionQuestion?.progress || {
      answeredCount: 0,
      totalCount: 50,
      percentComplete: 0,
    },

    loading: loading && !previousData,
    error,
    refetch,
    data: currentData,
  };
};
