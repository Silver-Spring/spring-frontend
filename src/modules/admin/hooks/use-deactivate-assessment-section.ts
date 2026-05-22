'use client';

import { DeactivateAssessmentSectionInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { DeactivateAssessmentSectionDoc } from '../graphql';
import { assessmentSectionRefetchQueries } from './assessment-type-lifecycle-refetch';

export const useDeactivateAssessmentSection = (assessmentType: string) => {
  const [deactivateMutation, { loading }] = useMutation(DeactivateAssessmentSectionDoc, {
    onCompleted: (data) => {
      const payload = data.deactivateAssessmentSection;
      if (payload?.success) {
        toast.success(payload.message || 'Section deactivated');
        return;
      }
      if (payload?.message) {
        toast.error(payload.message);
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to deactivate section');
    },
  });

  const deactivateAssessmentSection = async (input: DeactivateAssessmentSectionInput) => {
    const result = await deactivateMutation({
      variables: { input },
      refetchQueries: assessmentSectionRefetchQueries(assessmentType),
    });
    return result.data?.deactivateAssessmentSection;
  };

  return { deactivateAssessmentSection, loading };
};
