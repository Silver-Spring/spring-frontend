'use client';

import { SeedAssessmentTypeSectionsInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { SeedAssessmentTypeSectionsDoc } from '../graphql';
import { assessmentSectionRefetchQueries } from './assessment-type-lifecycle-refetch';

export const useSeedAssessmentTypeSections = () => {
  const [seedMutation, { loading }] = useMutation(SeedAssessmentTypeSectionsDoc, {
    onCompleted: (data) => {
      const payload = data.seedAssessmentTypeSections;
      if (payload?.success) {
        toast.success(
          payload.message ||
            `Seeded ${payload.sectionsCreated} section${payload.sectionsCreated === 1 ? '' : 's'} from preset`
        );
        return;
      }
      if (payload?.message) {
        toast.error(payload.message);
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to seed sections');
    },
  });

  const seedAssessmentTypeSections = async (input: SeedAssessmentTypeSectionsInput) => {
    const result = await seedMutation({
      variables: { input },
      refetchQueries: assessmentSectionRefetchQueries(input.assessmentTypeCode),
    });
    return result.data?.seedAssessmentTypeSections;
  };

  return { seedAssessmentTypeSections, loading };
};
