'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { ResetTemplateContentDoc } from '../graphql';
import { assessmentTemplateContentRefetchQueries } from './assessment-type-lifecycle-refetch';

export const useResetTemplateContent = () => {
  const [resetMutation, { loading }] = useMutation(ResetTemplateContentDoc, {
    onCompleted: (data) => {
      if (data.resetTemplateContent?.success) {
        toast.success(data.resetTemplateContent.message || 'Template content reset');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to reset template content');
    },
  });

  const resetTemplateContent = async (assessmentType: string, contentKey: string) => {
    const result = await resetMutation({
      variables: { assessmentType, contentKey },
      refetchQueries: assessmentTemplateContentRefetchQueries(assessmentType),
    });
    return result.data?.resetTemplateContent;
  };

  return { resetTemplateContent, loading };
};
