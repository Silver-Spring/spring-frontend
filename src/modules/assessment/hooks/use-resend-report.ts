import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { ResendReportDoc } from '../graphql';
import posthog from 'posthog-js';

export const useResendReport = () => {
  const [resendReportMutation, { data, loading, error }] = useMutation(ResendReportDoc, {
    onCompleted: (data) => {
      if (data.resendAssessmentReport?.success) {
        toast.success('Report resent successfully');
      } else {
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

  const resendReport = async (resultId: string, userEmail?: string) => {
    const result = await resendReportMutation({
      variables: { resultId },
    });

    // Track the event with the resultId passed as parameter
    if (result.data?.resendAssessmentReport?.success) {
      posthog.capture('report_resent', {
        result_id: resultId,
        user_email: userEmail,
      });
    }

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
