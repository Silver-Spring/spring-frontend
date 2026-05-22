'use client';

import { UpdateAssessmentTypeStagesInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { AssessmentTypeStagesDoc, UpdateAssessmentTypeStagesDoc } from '../graphql';
import { interpretationBandsRefetchQueries } from './interpretation-bands-refetch';

export const useUpdateAssessmentTypeStages = () => {
  const [updateMutation, { loading }] = useMutation(UpdateAssessmentTypeStagesDoc, {
    onCompleted: (data) => {
      const payload = data.updateAssessmentTypeStages;
      if (payload?.success) {
        toast.success(payload.message || 'Stage configuration updated');
        return;
      }
      if (payload?.message) {
        toast.error(payload.message);
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update stage configuration');
    },
  });

  const updateAssessmentTypeStages = async (input: UpdateAssessmentTypeStagesInput) => {
    const result = await updateMutation({
      variables: { input },
      refetchQueries: [
        {
          query: AssessmentTypeStagesDoc,
          variables: { assessmentTypeCode: input.assessmentTypeCode },
        },
        ...interpretationBandsRefetchQueries(input.assessmentTypeCode),
      ],
    });
    return result.data?.updateAssessmentTypeStages;
  };

  return { updateAssessmentTypeStages, loading };
};
