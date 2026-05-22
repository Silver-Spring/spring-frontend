'use client';

import { useQuery } from '@apollo/client/react';
import { AssessmentSectionPresetsDoc } from '../graphql';

export const useAssessmentSectionPresets = () => {
  const { data, loading, error, refetch } = useQuery(AssessmentSectionPresetsDoc);

  return {
    presets: data?.assessmentSectionPresets ?? [],
    loading,
    error,
    refetch,
  };
};
