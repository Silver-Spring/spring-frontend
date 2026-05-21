'use client';

import { UpdateRecommendedActionInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { UpdateRecommendedActionDoc } from '../graphql';
import { interpretationBandsRefetchQueries } from './interpretation-bands-refetch';

export const useUpdateRecommendedAction = (assessmentType: string) => {
  const [updateMutation, { loading }] = useMutation(UpdateRecommendedActionDoc, {
    refetchQueries: interpretationBandsRefetchQueries(assessmentType),
    onCompleted: (data) => {
      if (data.updateRecommendedAction?.success) {
        toast.success(data.updateRecommendedAction.message || 'Recommended action updated');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update recommended action');
    },
  });

  const updateRecommendedAction = async (input: UpdateRecommendedActionInput) => {
    const result = await updateMutation({ variables: { input } });
    return result.data?.updateRecommendedAction;
  };

  return { updateRecommendedAction, loading };
};
