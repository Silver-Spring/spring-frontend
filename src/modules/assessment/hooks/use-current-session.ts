import { useQuery } from '@apollo/client/react';
import { CurrentSessionDoc } from '../graphql';
import { useAssessmentStore } from '@/stores';
import { useEffect } from 'react';

export const useCurrentSession = () => {
  const { setCurrentSession } = useAssessmentStore();

  const { data, loading, error, refetch } = useQuery(CurrentSessionDoc);

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
