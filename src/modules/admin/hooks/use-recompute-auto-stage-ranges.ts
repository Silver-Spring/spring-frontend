'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { AssessmentTypeStagesDoc, RecomputeAutoStageRangesDoc } from '../graphql';
import { assessmentTypeStagesRefetchQueries } from './assessment-type-lifecycle-refetch';

export const useRecomputeAutoStageRanges = () => {
  const [recomputeMutation, { loading }] = useMutation(RecomputeAutoStageRangesDoc, {
    onCompleted: (data) => {
      const payload = data.recomputeAutoStageRanges;
      if (payload?.success) {
        toast.success(payload.message || 'Stage ranges reset to defaults');
        return;
      }
      if (payload?.message) {
        toast.error(payload.message);
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to reset stage ranges');
    },
  });

  const recomputeAutoStageRanges = async (assessmentTypeCode: string) => {
    const result = await recomputeMutation({
      variables: { assessmentTypeCode },
      refetchQueries: assessmentTypeStagesRefetchQueries(assessmentTypeCode),
    });
    return result.data?.recomputeAutoStageRanges;
  };

  return { recomputeAutoStageRanges, loading };
};
