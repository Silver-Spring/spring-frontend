import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { SubmitResponseDoc } from '../graphql';

export const useSubmitResponse = () => {
  const [submitResponseMutation, { data, loading, error }] = useMutation(SubmitResponseDoc, {
    onCompleted: (data) => {
      if (data.submitAssessmentResponse?.success) {
        // Optionally show success toast for each response
        // toast.success('Response saved');
      }
    },
    onError: (error) => {
      console.error('Error submitting response:', error);
      // Only show technical details in development
      const isDev = process.env.NODE_ENV === 'development';
      const errorMessage = isDev
        ? `Failed to save response. ${error.message}`
        : 'Failed to save your response. Please try again.';
      toast.error(errorMessage);
    },
  });

  const submitResponse = async (
    sessionId: string,
    questionId: string,
    responseValue: number,
    timeTakenSeconds?: number
  ) => {
    const result = await submitResponseMutation({
      variables: {
        sessionId,
        questionId,
        responseValue,
        timeTakenSeconds,
      },
    });

    return {
      response: result.data?.submitAssessmentResponse?.response || null,
      success: result.data?.submitAssessmentResponse?.success || false,
      message: result.data?.submitAssessmentResponse?.message || null,
    };
  };

  return {
    submitResponse,
    loading,
    error,
    data,
  };
};
