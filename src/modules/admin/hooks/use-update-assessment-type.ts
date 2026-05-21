'use client';

import { UpdateAssessmentTypeInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { AdminAssessmentTypesDoc, UpdateAssessmentTypeDoc } from '../graphql';

export const useUpdateAssessmentType = () => {
  const [updateMutation, { loading }] = useMutation(UpdateAssessmentTypeDoc, {
    refetchQueries: [{ query: AdminAssessmentTypesDoc }],
    onCompleted: (data) => {
      if (data.updateAssessmentType?.success) {
        toast.success(data.updateAssessmentType.message || 'Assessment type updated');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update assessment type');
    },
  });

  const updateAssessmentType = async (input: UpdateAssessmentTypeInput) => {
    const result = await updateMutation({ variables: { input } });
    return result.data?.updateAssessmentType;
  };

  return { updateAssessmentType, loading };
};
