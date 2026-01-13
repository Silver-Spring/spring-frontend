import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { ResendReportDoc } from '../graphql';

export const useResendReport = () => {
  const [resendReportMutation, { data, loading, error }] = useMutation(ResendReportDoc, {
    onCompleted: (data) => {
      if (!data.resendAssessmentReport?.success) {
        toast.error('Failed to resend report. Please try again.');
      }
    },
    onError: (error) => {
      console.error('Error resending report:', error);
      // Only show technical details in development
      const isDev = process.env.NODE_ENV === 'development';
      const errorMessage = isDev
        ? `Failed to resend report. ${error.message}`
        : 'Failed to resend report. Please try again or contact support.';
      toast.error(errorMessage);
    },
  });

  const resendReport = async (resultId: string) => {
    const result = await resendReportMutation({
      variables: { resultId },
    });

    return {
      success: result.data?.resendAssessmentReport?.success || false,
      message: result.data?.resendAssessmentReport?.message || null,
    };
  };

  return {
    resendReport,
    loading,
    error,
    data,
  };
};
