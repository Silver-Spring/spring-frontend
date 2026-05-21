'use client';

import { CreateRecommendedActionInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { CreateRecommendedActionDoc } from '../graphql';
import { interpretationBandsRefetchQueries } from './interpretation-bands-refetch';

export const useCreateRecommendedAction = (assessmentType: string) => {
  const [createMutation, { loading }] = useMutation(CreateRecommendedActionDoc, {
    refetchQueries: interpretationBandsRefetchQueries(assessmentType),
    onCompleted: (data) => {
      if (data.createRecommendedAction?.success) {
        toast.success(data.createRecommendedAction.message || 'Recommended action created');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create recommended action');
    },
  });

  const createRecommendedAction = async (input: CreateRecommendedActionInput) => {
    const result = await createMutation({ variables: { input } });
    return result.data?.createRecommendedAction;
  };

  return { createRecommendedAction, loading };
};
