'use client';

import { UpdateTemplateContentInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { UpdateTemplateContentDoc } from '../graphql';

export const useUpdateTemplateContent = () => {
  const [updateMutation, { loading }] = useMutation(UpdateTemplateContentDoc, {
    onCompleted: (data) => {
      if (data.updateTemplateContent?.success) {
        toast.success(data.updateTemplateContent.message || 'Template content updated');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update template content');
    },
  });

  const updateTemplateContent = async (input: UpdateTemplateContentInput) => {
    const result = await updateMutation({ variables: { input } });
    return result.data?.updateTemplateContent;
  };

  return { updateTemplateContent, loading };
};
