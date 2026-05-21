'use client';

import { DeleteRecommendedActionInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { DeleteRecommendedActionDoc } from '../graphql';
import { interpretationBandsRefetchQueries } from './interpretation-bands-refetch';

export const useDeleteRecommendedAction = (assessmentType: string) => {
  const [deleteMutation, { loading }] = useMutation(DeleteRecommendedActionDoc, {
    refetchQueries: interpretationBandsRefetchQueries(assessmentType),
    onCompleted: (data) => {
      if (data.deleteRecommendedAction?.success) {
        toast.success(data.deleteRecommendedAction.message || 'Recommended action deleted');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete recommended action');
    },
  });

  const deleteRecommendedAction = async (input: DeleteRecommendedActionInput) => {
    const result = await deleteMutation({ variables: { input } });
    return result.data?.deleteRecommendedAction;
  };

  return { deleteRecommendedAction, loading };
};
