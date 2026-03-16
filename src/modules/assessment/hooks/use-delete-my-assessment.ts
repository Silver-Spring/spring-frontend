import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { DeleteMyAssessmentDoc } from '../graphql/delete-my-assessment.graphql';

export const useDeleteMyAssessment = () => {
  const [deleteMyAssessmentMutation, { data, loading, error }] = useMutation(
    DeleteMyAssessmentDoc,
    {
      onCompleted: (data) => {
        if (data.deleteMyAssessment?.success) {
          toast.success(
            data.deleteMyAssessment.message || 'Assessment deleted successfully'
          );
        }
      },
      onError: (error) => {
        console.error('Error deleting assessment:', error);
        toast.error(error.message || 'Failed to delete assessment');
      },
    }
  );

  const deleteMyAssessment = async () => {
    try {
      const result = await deleteMyAssessmentMutation();
      return result.data?.deleteMyAssessment || null;
    } catch (error) {
      console.error('Error in deleteMyAssessment:', error);
      throw error;
    }
  };

  return {
    deleteMyAssessment,
    loading,
    error,
    data,
  };
};
