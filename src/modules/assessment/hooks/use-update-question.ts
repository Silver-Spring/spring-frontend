import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { UpdateAssessmentQuestionDoc } from '../graphql';

export const useUpdateQuestion = () => {
  const [updateQuestionMutation, { data, loading, error }] = useMutation(
    UpdateAssessmentQuestionDoc,
    {
      onCompleted: (data) => {
        if (data.updateAssessmentQuestion?.success) {
          toast.success('Question updated successfully!');
        }
      },
      onError: (error) => {
        console.error('Error updating question:', error);
        const isDev = process.env.NODE_ENV === 'development';
        const errorMessage = isDev
          ? `Failed to update question. ${error.message}`
          : 'Failed to update question. Please try again.';
        toast.error(errorMessage);
      },
    }
  );

  const updateQuestion = async (input: {
    id: string;
    questionText?: string;
    displayOrder?: number;
    isActive?: boolean;
  }) => {
    const result = await updateQuestionMutation({
      variables: { input },
    });

    return {
      question: result.data?.updateAssessmentQuestion?.question || null,
      success: result.data?.updateAssessmentQuestion?.success || false,
      message: result.data?.updateAssessmentQuestion?.message || null,
    };
  };

  return {
    updateQuestion,
    loading,
    error,
    data,
  };
};
