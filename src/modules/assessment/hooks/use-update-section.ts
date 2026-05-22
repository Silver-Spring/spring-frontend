import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { UpdateAssessmentSectionDoc, GetAllSectionsDoc } from '../graphql';

export const useUpdateSection = (assessmentType?: string) => {
  const [updateSectionMutation, { data, loading, error }] = useMutation(
    UpdateAssessmentSectionDoc,
    {
      onCompleted: (data) => {
        if (data.updateAssessmentSection?.success) {
          toast.success('Section updated successfully!');
        }
      },
      onError: (error) => {
        console.error('Error updating section:', error);
        const isDev = process.env.NODE_ENV === 'development';
        const errorMessage = isDev
          ? `Failed to update section. ${error.message}`
          : 'Failed to update section. Please try again.';
        toast.error(errorMessage);
      },
    }
  );

  const updateSection = async (input: {
    id: string;
    name?: string;
    description?: string;
    aboutDescription?: string;
    subtitle?: string;
    emoji?: string;
    displayColor?: string;
    displayOrder?: number;
    isActive?: boolean;
  }) => {
    const result = await updateSectionMutation({
      variables: { input },
      refetchQueries: assessmentType
        ? [{ query: GetAllSectionsDoc, variables: { assessmentType } }]
        : [{ query: GetAllSectionsDoc }],
    });

    return {
      section: result.data?.updateAssessmentSection?.section || null,
      success: result.data?.updateAssessmentSection?.success || false,
      message: result.data?.updateAssessmentSection?.message || null,
    };
  };

  return {
    updateSection,
    loading,
    error,
    data,
  };
};
