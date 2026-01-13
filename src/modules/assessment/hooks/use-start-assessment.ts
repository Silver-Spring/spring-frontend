import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { StartAssessmentDoc } from '../graphql';
import { useAssessmentStore } from '@/stores';

export const useStartAssessment = () => {
  const { setCurrentSession } = useAssessmentStore();

  const [startAssessmentMutation, { data, loading, error }] = useMutation(StartAssessmentDoc, {
    onCompleted: (data) => {
      if (data.startAssessment?.session) {
        setCurrentSession(data.startAssessment.session);
        toast.success('Assessment started successfully!');
      }
    },
    onError: (error) => {
      console.error('Error starting assessment:', error);
      // Only show technical details in development
      const isDev = process.env.NODE_ENV === 'development';
      const errorMessage = isDev
        ? `Failed to start assessment. ${error.message}`
        : 'Failed to start assessment. Please try again or contact support.';
      toast.error(errorMessage);
    },
  });

  const startAssessment = async (paymentId: string) => {
    try {
      console.log('Starting assessment mutation with paymentId:', paymentId);
      const result = await startAssessmentMutation({
        variables: { paymentId },
      });

      console.log('Mutation result:', result);

      return {
        session: result.data?.startAssessment?.session || null,
        message: result.data?.startAssessment?.message || null,
      };
    } catch (error) {
      console.error('Error in startAssessment mutation:', error);
      throw error;
    }
  };

  return {
    startAssessment,
    loading,
    error,
    data,
  };
};
