'use client';

import { CreateAssessmentSectionInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { CreateAssessmentSectionDoc } from '../graphql';
import { assessmentSectionRefetchQueries } from './assessment-type-lifecycle-refetch';

export const useCreateAssessmentSection = () => {
  const [createMutation, { loading }] = useMutation(CreateAssessmentSectionDoc, {
    onCompleted: (data) => {
      const payload = data.createAssessmentSection;
      if (payload?.success) {
        toast.success(payload.message || 'Section created');
        return;
      }
      if (payload?.message) {
        toast.error(payload.message);
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create section');
    },
  });

  const createAssessmentSection = async (input: CreateAssessmentSectionInput) => {
    const result = await createMutation({
      variables: { input },
      refetchQueries: assessmentSectionRefetchQueries(input.assessmentTypeCode, {
        refetchBands: true,
      }),
    });
    return result.data?.createAssessmentSection;
  };

  return { createAssessmentSection, loading };
};
