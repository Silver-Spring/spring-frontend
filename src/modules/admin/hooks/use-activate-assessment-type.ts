'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { ActivateAssessmentTypeDoc } from '../graphql';
import { assessmentTypeLifecycleRefetchQueries } from './assessment-type-lifecycle-refetch';

export const useActivateAssessmentType = () => {
  const [activateMutation, { loading }] = useMutation(ActivateAssessmentTypeDoc, {
    onCompleted: (data) => {
      const payload = data.activateAssessmentType;
      if (payload?.success) {
        toast.success(payload.message || 'Assessment type is now live');
        return;
      }
      if (payload?.message) {
        toast.error(payload.message);
        return;
      }
      if (payload && !payload.success) {
        toast.error('Assessment type is not ready to activate');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to activate assessment type');
    },
  });

  const activateAssessmentType = async (code: string) => {
    const result = await activateMutation({
      variables: { code },
      refetchQueries: assessmentTypeLifecycleRefetchQueries(code),
    });
    return result.data?.activateAssessmentType;
  };

  return { activateAssessmentType, loading };
};
