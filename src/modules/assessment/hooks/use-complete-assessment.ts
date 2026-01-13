import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { CompleteAssessmentDoc } from '../graphql';
import { useAssessmentStore } from '@/stores';

export const useCompleteAssessment = () => {
  const { clearCurrentSession } = useAssessmentStore();

  const [completeAssessmentMutation, { data, loading, error }] = useMutation(
    CompleteAssessmentDoc,
    {
      onCompleted: (data) => {
        if (data.completeAssessment?.success) {
          clearCurrentSession();
          toast.success('Assessment completed! Results have been emailed to you.');
        }
      },
      onError: (error) => {
        console.error('Error completing assessment:', error);
        // Only show technical details in development
        const isDev = process.env.NODE_ENV === 'development';
        const errorMessage = isDev
          ? `Failed to complete assessment. ${error.message}`
          : 'Failed to complete assessment. Please try again or contact support.';
        toast.error(errorMessage);
      },
    }
  );

  const completeAssessment = async (sessionId: string) => {
    const result = await completeAssessmentMutation({
      variables: { sessionId },
    });

    return {
      result: result.data?.completeAssessment?.result || null,
      success: result.data?.completeAssessment?.success || false,
      message: result.data?.completeAssessment?.message || null,
      pdfPath: result.data?.completeAssessment?.pdfPath || null,
    };
  };

  return {
    completeAssessment,
    loading,
    error,
    data,
  };
};
