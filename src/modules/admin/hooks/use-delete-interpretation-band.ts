'use client';

import { DeleteInterpretationBandInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { DeleteInterpretationBandDoc } from '../graphql';
import { interpretationBandsRefetchQueries } from './interpretation-bands-refetch';

export const useDeleteInterpretationBand = (assessmentType: string) => {
  const [deleteMutation, { loading }] = useMutation(DeleteInterpretationBandDoc, {
    refetchQueries: interpretationBandsRefetchQueries(assessmentType),
    onCompleted: (data) => {
      if (data.deleteInterpretationBand?.success) {
        toast.success(
          data.deleteInterpretationBand.message || 'Interpretation band deleted'
        );
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete interpretation band');
    },
  });

  const deleteInterpretationBand = async (input: DeleteInterpretationBandInput) => {
    const result = await deleteMutation({ variables: { input } });
    return result.data?.deleteInterpretationBand;
  };

  return { deleteInterpretationBand, loading };
};
