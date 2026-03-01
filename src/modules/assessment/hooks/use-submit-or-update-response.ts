'use client';

import { useApolloClient, useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { SubmitOrUpdateResponseDoc } from '../graphql/submit-or-update-response.graphql';
import { GetSessionQuestionDoc } from '../graphql/get-session-question.graphql';

interface SubmitOrUpdateInput {
  sessionId: string;
  questionId: string;
  questionNumber: number;
  responseValue: number;
  timeTakenSeconds?: number;
  isNavigatingForward?: boolean;
}

export const useSubmitOrUpdateResponse = () => {
  const apolloClient = useApolloClient();
  
  const [submitOrUpdateMutation, { loading, error }] = useMutation(
    SubmitOrUpdateResponseDoc,
    {
      onError: (error) => {
        toast.error(error.message || 'Failed to save answer. Please try again.');
      },
    }
  );

  const submitOrUpdateResponse = async (input: SubmitOrUpdateInput) => {
    try {
      const result = await submitOrUpdateMutation({
        variables: {
          input: {
            ...input,
            isNavigatingForward: input.isNavigatingForward ?? true,
          },
        },
        refetchQueries: [
          {
            query: GetSessionQuestionDoc,
            variables: {
              sessionId: input.sessionId,
              questionNumber: input.questionNumber,
            },
          },
        ],
        awaitRefetchQueries: false,
        fetchPolicy: 'network-only',
      });

      const data = result.data?.submitOrUpdateResponse;

      if (!data) {
        throw new Error('No data returned from mutation');
      }

      if (data.progress && data.nextQuestion?.hasNext && data.nextQuestion.questionNumber) {
        const nextQuestionNum = data.nextQuestion.questionNumber;
        try {
          const cachedNextQuestion = apolloClient.readQuery({
            query: GetSessionQuestionDoc,
            variables: { sessionId: input.sessionId, questionNumber: nextQuestionNum },
          });

          if (cachedNextQuestion?.getSessionQuestion) {
            apolloClient.writeQuery({
              query: GetSessionQuestionDoc,
              variables: { sessionId: input.sessionId, questionNumber: nextQuestionNum },
              data: {
                getSessionQuestion: {
                  ...cachedNextQuestion.getSessionQuestion,
                  progress: data.progress,
                },
              },
            });
          }
        } catch (error) {
          console.log('Cache update skipped for next question');
        }
      }

      return {
        success: data.success,
        message: data.message,
        response: data.response,
        session: data.session,
        progress: data.progress,
        nextQuestion: data.nextQuestion,
      };
    } catch (error) {
      console.error('Failed to submit/update response:', error);
      throw error;
    }
  };

  return {
    submitOrUpdateResponse,
    loading,
    error,
  };
};
