import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { StartAssessmentDoc } from '../graphql';
import { useAssessmentStore } from '@/stores';

export const useStartAssessment = () => {
  const { setCurrentSession } = useAssessmentStore();

  const [startAssessmentMutation, { data, loading, error }] = useMutation(StartAssessmentDoc, {
    onCompleted: (data) => {
      if (data.startAssessment?.session) {
        setCurrentSession({
          ...data.startAssessment.session,
          paymentId: data.startAssessment.session.paymentId || null,
        });
        toast.success('Assessment started successfully!');
      }
    },
    onError: (error) => {
      toast.error('Failed to start assessment. Please try again.');
      // Only show technical details in development
      const isDev = process.env.NODE_ENV === 'development';
      const errorMessage = isDev
        ? `Failed to start assessment. ${error.message}`
        : 'Failed to start assessment. Please try again or contact support.';
      toast.error(errorMessage);
    },
  });

  const startAssessment = async (paymentId?: string | null) => {
    try {
      const result = await startAssessmentMutation({
        variables: { paymentId: paymentId || null },
      });

      return {
        session: result.data?.startAssessment?.session || null,
        message: result.data?.startAssessment?.message || null,
      };
    } catch (error) {
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
