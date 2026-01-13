import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { DeleteAssessmentQuestionDoc } from '../graphql';

export const useDeleteQuestion = () => {
  const [deleteQuestionMutation, { data, loading, error }] = useMutation(
    DeleteAssessmentQuestionDoc,
    {
      onCompleted: (data) => {
        if (data.deleteAssessmentQuestion?.success) {
          toast.success('Question deleted successfully!');
        }
      },
      onError: (error) => {
        console.error('Error deleting question:', error);
        const isDev = process.env.NODE_ENV === 'development';
        const errorMessage = isDev
          ? `Failed to delete question. ${error.message}`
          : 'Failed to delete question. Please try again.';
        toast.error(errorMessage);
      },
    }
  );

  const deleteQuestion = async (id: string) => {
    const result = await deleteQuestionMutation({
      variables: { input: { id } },
    });

    return {
      success: result.data?.deleteAssessmentQuestion?.success || false,
      message: result.data?.deleteAssessmentQuestion?.message || null,
    };
  };

  return {
    deleteQuestion,
    loading,
    error,
    data,
  };
};
