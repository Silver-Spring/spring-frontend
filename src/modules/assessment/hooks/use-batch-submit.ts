'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { BatchSubmitResponsesDoc } from '../graphql/batch-submit-responses.graphql';

interface BatchResponse {
  questionId: string;
  responseValue: number;
  timeTakenSeconds?: number;
}

export const useBatchSubmit = () => {
  const [batchSubmitMutation, { loading }] = useMutation(BatchSubmitResponsesDoc, {
    onError: (error) => {
      toast.error(error.message || 'Failed to save responses');
    },
  });

  const batchSubmit = async (sessionId: string, responses: BatchResponse[]) => {
    try {
      const result = await batchSubmitMutation({
        variables: {
          input: {
            sessionId,
            responses,
          },
        },
      });

      return {
        success: result.data?.batchSubmitResponses?.success || false,
        message: result.data?.batchSubmitResponses?.message || null,
        answeredCount: result.data?.batchSubmitResponses?.answeredCount || 0,
        responses: result.data?.batchSubmitResponses?.responses || [],
      };
    } catch (error) {
      console.error('Error submitting batch:', error);
      return {
        success: false,
        message: 'Failed to submit responses',
        answeredCount: 0,
        responses: [],
      };
    }
  };

  return { batchSubmit, loading };
};
