import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { useAssessmentStore } from '@/stores';
import {
  AssessmentTypeCode,
  DEFAULT_ASSESSMENT_TYPE,
} from '../constants';
import { StartAssessmentDoc } from '../graphql';

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
  });

  const startAssessment = async (
    paymentId?: string | null,
    assessmentType: AssessmentTypeCode = DEFAULT_ASSESSMENT_TYPE
  ) => {
    try {
      const result = await startAssessmentMutation({
        variables: {
          input: {
            paymentId: paymentId || null,
            assessmentType,
          },
        },
      });

      return {
        session: result.data?.startAssessment?.session || null,
        assessmentType: result.data?.startAssessment?.assessmentType || null,
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
