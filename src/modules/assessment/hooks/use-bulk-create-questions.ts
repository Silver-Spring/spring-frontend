import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { BulkCreateAssessmentQuestionsDoc, GetSectionQuestionsDoc } from '../graphql';

export const useBulkCreateQuestions = () => {
  const [bulkCreateQuestionsMutation, { data, loading, error }] = useMutation(
    BulkCreateAssessmentQuestionsDoc,
    {
      onCompleted: (data) => {
        if (data.bulkCreateAssessmentQuestions?.success) {
          const count = data.bulkCreateAssessmentQuestions.count || 0;
          const message = data.bulkCreateAssessmentQuestions.message || '';
          // Show count and auto-assigned order range in success message
          toast.success(`${count} questions imported. ${message}`);
        }
      },
      onError: (error) => {
        console.error('Error bulk creating questions:', error);
        const isDev = process.env.NODE_ENV === 'development';
        const errorMessage = isDev
          ? `Failed to create questions. ${error.message}`
          : 'Failed to create questions. Please try again.';
        toast.error(errorMessage);
      },
    }
  );

  const bulkCreateQuestions = async (input: {
    sectionId: string;
    questions: Array<{
      questionText: string;
      // displayOrder removed - now auto-assigned sequentially by backend
    }>;
  }) => {
    const result = await bulkCreateQuestionsMutation({
      variables: { input },
      refetchQueries: [
        {
          query: GetSectionQuestionsDoc,
          variables: { sectionId: input.sectionId },
        },
      ],
    });

    return {
      questions: result.data?.bulkCreateAssessmentQuestions?.questions || [],
      count: result.data?.bulkCreateAssessmentQuestions?.count || 0,
      success: result.data?.bulkCreateAssessmentQuestions?.success || false,
      message: result.data?.bulkCreateAssessmentQuestions?.message || null,
    };
  };

  return {
    bulkCreateQuestions,
    loading,
    error,
    data,
  };
};
