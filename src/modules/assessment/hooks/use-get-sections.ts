import { useQuery } from '@apollo/client/react';
import { GetAllSectionsDoc } from '../graphql';

export const useGetSections = () => {
  const { data, loading, error, refetch } = useQuery(GetAllSectionsDoc);

  return {
    sections: data?.assessmentSections?.nodes || [],
    loading,
    error,
    refetch,
  };
};
