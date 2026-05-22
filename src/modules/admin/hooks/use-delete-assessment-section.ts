'use client';

import { DeleteAssessmentSectionInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { DeleteAssessmentSectionDoc } from '../graphql';
import { assessmentSectionRefetchQueries } from './assessment-type-lifecycle-refetch';

export const useDeleteAssessmentSection = (assessmentType: string) => {
  const [deleteMutation, { loading }] = useMutation(DeleteAssessmentSectionDoc, {
    onCompleted: (data) => {
      const payload = data.deleteAssessmentSection;
      if (payload?.success) {
        toast.success(payload.message || 'Section removed');
        return;
      }
      if (payload?.message) {
        toast.error(payload.message);
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete section');
    },
  });

  const deleteAssessmentSection = async (input: DeleteAssessmentSectionInput) => {
    const result = await deleteMutation({
      variables: { input },
      refetchQueries: assessmentSectionRefetchQueries(assessmentType),
    });
    return result.data?.deleteAssessmentSection;
  };

  return { deleteAssessmentSection, loading };
};
