'use client';

import { UpdateInterpretationBandInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { UpdateInterpretationBandDoc } from '../graphql';
import { interpretationBandsRefetchQueries } from './interpretation-bands-refetch';

export const useUpdateInterpretationBand = (assessmentType: string) => {
  const [updateMutation, { loading }] = useMutation(UpdateInterpretationBandDoc, {
    refetchQueries: interpretationBandsRefetchQueries(assessmentType),
    onCompleted: (data) => {
      if (data.updateInterpretationBand?.success) {
        toast.success(
          data.updateInterpretationBand.message || 'Interpretation band updated'
        );
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update interpretation band');
    },
  });

  const updateInterpretationBand = async (input: UpdateInterpretationBandInput) => {
    const result = await updateMutation({ variables: { input } });
    return result.data?.updateInterpretationBand;
  };

  return { updateInterpretationBand, loading };
};
