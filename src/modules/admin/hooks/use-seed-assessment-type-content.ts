'use client';

import { SeedAssessmentTypeContentInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { SeedAssessmentTypeContentDoc } from '../graphql';
import { assessmentTypeSeedRefetchQueries } from './assessment-type-lifecycle-refetch';

export const useSeedAssessmentTypeContent = () => {
  const [seedMutation, { loading }] = useMutation(SeedAssessmentTypeContentDoc, {
    onCompleted: (data) => {
      if (data.seedAssessmentTypeContent?.success) {
        toast.success(
          data.seedAssessmentTypeContent.message || 'Content cloned from template type'
        );
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to clone content from template');
    },
  });

  const seedAssessmentTypeContent = async (input: SeedAssessmentTypeContentInput) => {
    const result = await seedMutation({
      variables: { input },
      refetchQueries: assessmentTypeSeedRefetchQueries(input.assessmentTypeCode, {
        refetchBands: input.cloneBands ?? true,
      }),
    });
    return result.data?.seedAssessmentTypeContent;
  };

  return { seedAssessmentTypeContent, loading };
};
