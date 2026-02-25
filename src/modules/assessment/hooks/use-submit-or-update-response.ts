'use client';

import { useMutation } from '@apollo/client/react';
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
