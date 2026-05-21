import { useQuery } from '@apollo/client/react';
import {
  AssessmentTypeCode,
  DEFAULT_ASSESSMENT_TYPE,
} from '../constants';
import { GetAllSectionsDoc } from '../graphql';

export const useGetSections = (
  assessmentType: AssessmentTypeCode = DEFAULT_ASSESSMENT_TYPE
) => {
  const { data, loading, error, refetch } = useQuery(GetAllSectionsDoc, {
    variables: { assessmentType },
  });

  return {
    sections: data?.assessmentSections?.nodes || [],
    loading,
    error,
    refetch,
  };
};
