import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { useAssessmentStore } from '@/stores';
import { JoinCoupleAssessmentDoc } from '../graphql';

export const useJoinCoupleAssessment = () => {
  const { setCurrentSession } = useAssessmentStore();

  const [joinCoupleAssessmentMutation, { data, loading, error }] = useMutation(
    JoinCoupleAssessmentDoc,
    {
      onCompleted: (data) => {
        if (data.joinCoupleAssessment?.session) {
          setCurrentSession({
            ...data.joinCoupleAssessment.session,
            paymentId: data.joinCoupleAssessment.session.paymentId || null,
          });
        }
      },
    }
  );

  const joinCoupleAssessment = async (inviteCode: string) => {
    try {
      const result = await joinCoupleAssessmentMutation({
        variables: {
          input: { inviteCode },
        },
      });

      return {
        session: result.data?.joinCoupleAssessment?.session || null,
        coupleId: result.data?.joinCoupleAssessment?.coupleId || null,
        assessmentType: result.data?.joinCoupleAssessment?.assessmentType || null,
        message: result.data?.joinCoupleAssessment?.message || null,
      };
    } catch (error) {
      toast.error('Failed to join couples assessment. Please check your invite code and try again.');
      throw error;
    }
  };

  return {
    joinCoupleAssessment,
    loading,
    error,
    data,
  };
};
