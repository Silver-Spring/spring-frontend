import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { useAssessmentStore } from '@/stores';
import { StartCoupleAssessmentDoc } from '../graphql';

export const useStartCoupleAssessment = () => {
  const { setCurrentSession } = useAssessmentStore();

  const [startCoupleAssessmentMutation, { data, loading, error }] = useMutation(
    StartCoupleAssessmentDoc,
    {
      onCompleted: (data) => {
        if (data.startCoupleAssessment?.session) {
          setCurrentSession({
            ...data.startCoupleAssessment.session,
            paymentId: data.startCoupleAssessment.session.paymentId || null,
          });
        }
      },
    }
  );

  const startCoupleAssessment = async (paymentId: string | null, assessmentType: string) => {
    try {
      const result = await startCoupleAssessmentMutation({
        variables: {
          input: {
            paymentId: paymentId || null,
            assessmentType,
          },
        },
      });

      return {
        session: result.data?.startCoupleAssessment?.session || null,
        inviteCode: result.data?.startCoupleAssessment?.inviteCode || null,
        coupleId: result.data?.startCoupleAssessment?.coupleId || null,
        assessmentType: result.data?.startCoupleAssessment?.assessmentType || null,
        message: result.data?.startCoupleAssessment?.message || null,
      };
    } catch (error) {
      toast.error('Failed to start couples assessment. Please try again.');
      throw error;
    }
  };

  return {
    startCoupleAssessment,
    loading,
    error,
    data,
  };
};
