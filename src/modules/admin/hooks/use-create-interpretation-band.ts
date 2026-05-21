'use client';

import { CreateInterpretationBandInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { CreateInterpretationBandDoc } from '../graphql';
import { interpretationBandsRefetchQueries } from './interpretation-bands-refetch';

export const useCreateInterpretationBand = (assessmentType: string) => {
  const [createMutation, { loading }] = useMutation(CreateInterpretationBandDoc, {
    refetchQueries: interpretationBandsRefetchQueries(assessmentType),
    onCompleted: (data) => {
      if (data.createInterpretationBand?.success) {
        toast.success(
          data.createInterpretationBand.message ||
            `Band "${data.createInterpretationBand.band?.label}" created`
        );
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create interpretation band');
    },
  });

  const createInterpretationBand = async (input: CreateInterpretationBandInput) => {
    const result = await createMutation({ variables: { input } });
    return result.data?.createInterpretationBand;
  };

  return { createInterpretationBand, loading };
};
