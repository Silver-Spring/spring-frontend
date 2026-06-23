'use client';

import { useMutation } from '@apollo/client/react';
import { useRef } from 'react';
import { toast } from 'sonner';
import { ResetTemplateContentDoc } from '../graphql';
import { assessmentTemplateContentRefetchQueries } from './assessment-type-lifecycle-refetch';

export const useResetTemplateContent = () => {
  const successMessageRef = useRef<string | undefined>(undefined);

  const [resetMutation, { loading }] = useMutation(ResetTemplateContentDoc, {
    onCompleted: (data) => {
      if (data.resetTemplateContent?.success) {
        const msg = successMessageRef.current ?? data.resetTemplateContent.message ?? 'Template content reset';
        successMessageRef.current = undefined;
        toast.success(msg);
      }
    },
    onError: (error) => {
      successMessageRef.current = undefined;
      toast.error(error.message || 'Failed to reset template content');
    },
  });

  const resetTemplateContent = async (assessmentType: string, contentKey: string, successMessage?: string) => {
    successMessageRef.current = successMessage;
    const result = await resetMutation({
      variables: { assessmentType, contentKey },
      refetchQueries: assessmentTemplateContentRefetchQueries(assessmentType),
    });
    return result.data?.resetTemplateContent;
  };

  return { resetTemplateContent, loading };
};
