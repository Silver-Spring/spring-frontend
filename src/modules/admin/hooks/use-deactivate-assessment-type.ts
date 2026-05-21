'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { DeactivateAssessmentTypeDoc } from '../graphql';
import { isProtectedAssessmentType } from '../lib/assessment-type-lifecycle';
import { assessmentTypeLifecycleRefetchQueries } from './assessment-type-lifecycle-refetch';

export const useDeactivateAssessmentType = () => {
  const [deactivateMutation, { loading }] = useMutation(DeactivateAssessmentTypeDoc, {
    onCompleted: (data) => {
      const payload = data.deactivateAssessmentType;
      if (payload?.success) {
        toast.success(payload.message || 'Assessment type deactivated');
        return;
      }
      if (payload?.message) {
        toast.error(payload.message);
        return;
      }
      if (payload && !payload.success) {
        toast.error('Failed to deactivate assessment type');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to deactivate assessment type');
    },
  });

  const deactivateAssessmentType = async (code: string) => {
    if (isProtectedAssessmentType(code)) {
      toast.error(`${code.toUpperCase()} is a protected type and cannot be deactivated`);
      return { success: false, message: 'Protected assessment type' };
    }

    const result = await deactivateMutation({
      variables: { code },
      refetchQueries: assessmentTypeLifecycleRefetchQueries(code),
    });
    return result.data?.deactivateAssessmentType;
  };

  return { deactivateAssessmentType, loading };
};
