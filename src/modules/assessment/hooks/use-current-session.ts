import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { useAssessmentStore } from '@/stores';
import {
  AssessmentTypeCode,
  DEFAULT_ASSESSMENT_TYPE,
} from '../constants';
import { CurrentSessionDoc } from '../graphql';

export const useCurrentSession = (
  assessmentType: AssessmentTypeCode = DEFAULT_ASSESSMENT_TYPE
) => {
  const { setCurrentSession } = useAssessmentStore();

  const { data, loading, error, refetch } = useQuery(CurrentSessionDoc, {
    variables: { assessmentType },
  });

  useEffect(() => {
    if (data?.currentAssessmentSession) {
      setCurrentSession({
        ...data.currentAssessmentSession,
        paymentId: data.currentAssessmentSession.paymentId || null,
      });
    }
  }, [data?.currentAssessmentSession, setCurrentSession]);

  return {
    currentSession: data?.currentAssessmentSession || null,
    loading,
    error,
    refetch,
  };
};
