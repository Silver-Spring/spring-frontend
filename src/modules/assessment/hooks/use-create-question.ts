import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { CreateAssessmentQuestionDoc, GetSectionQuestionsDoc } from '../graphql';

export const useCreateQuestion = () => {
  const [createQuestionMutation, { data, loading, error }] = useMutation(
    CreateAssessmentQuestionDoc,
    {
      onCompleted: (data) => {
        if (data.createAssessmentQuestion?.success) {
          // Show success message with auto-assigned display order
          const message = data.createAssessmentQuestion.message || 'Question created successfully!';
          toast.success(message);
        }
      },
      onError: (error) => {
        console.error('Error creating question:', error);
        const isDev = process.env.NODE_ENV === 'development';
        const errorMessage = isDev
          ? `Failed to create question. ${error.message}`
          : 'Failed to create question. Please try again.';
        toast.error(errorMessage);
      },
    }
  );

  const createQuestion = async (input: {
    sectionId: string;
    questionText: string;
    // displayOrder removed - now auto-assigned by backend
  }) => {
    const result = await createQuestionMutation({
      variables: { input },
      refetchQueries: [
        {
          query: GetSectionQuestionsDoc,
          variables: { sectionId: input.sectionId },
        },
      ],
    });

    return {
      question: result.data?.createAssessmentQuestion?.question || null,
      success: result.data?.createAssessmentQuestion?.success || false,
      message: result.data?.createAssessmentQuestion?.message || null,
    };
  };

  return {
    createQuestion,
    loading,
    error,
    data,
  };
};
