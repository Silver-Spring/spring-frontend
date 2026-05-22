'use client';

import { UpdateAssessmentTypeInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { AdminAssessmentTypesDoc, UpdateAssessmentTypeDoc } from '../graphql';
import { assessmentTypeLifecycleRefetchQueries } from './assessment-type-lifecycle-refetch';

export const useUpdateAssessmentType = () => {
  const [updateMutation, { loading }] = useMutation(UpdateAssessmentTypeDoc, {
    onCompleted: (data) => {
      const payload = data.updateAssessmentType;
      if (payload?.success) {
        toast.success(payload.message || 'Assessment type updated');
        return;
      }
      if (payload?.message) {
        toast.error(payload.message);
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update assessment type');
    },
  });

  const updateAssessmentType = async (input: UpdateAssessmentTypeInput) => {
    const result = await updateMutation({
      variables: { input },
      refetchQueries: input.code
        ? assessmentTypeLifecycleRefetchQueries(input.code)
        : [{ query: AdminAssessmentTypesDoc }],
    });
    return result.data?.updateAssessmentType;
  };

  return { updateAssessmentType, loading };
};
