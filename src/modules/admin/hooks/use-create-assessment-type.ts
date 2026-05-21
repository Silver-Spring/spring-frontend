'use client';

import { CreateAssessmentTypeInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { CreateAssessmentTypeDoc } from '../graphql';
import { assessmentTypeLifecycleRefetchQueries } from './assessment-type-lifecycle-refetch';

export const useCreateAssessmentType = () => {
  const [createMutation, { loading }] = useMutation(CreateAssessmentTypeDoc, {
    onCompleted: (data) => {
      if (data.createAssessmentType?.success) {
        toast.success(
          data.createAssessmentType.message ||
            `Draft "${data.createAssessmentType.assessmentType?.code}" created`
        );
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create assessment type');
    },
  });

  const createAssessmentType = async (input: CreateAssessmentTypeInput) => {
    const result = await createMutation({
      variables: { input },
      refetchQueries: assessmentTypeLifecycleRefetchQueries(input.code),
    });
    return result.data?.createAssessmentType;
  };

  return { createAssessmentType, loading };
};
