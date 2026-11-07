'use client';

import { useQuery } from '@apollo/client/react';
import { WorkshopEventBySlugDoc } from '../graphql/workshop-event-by-slug.graphql';

export const useWorkshopEvent = (slug: string) => {
  const { data, loading, error } = useQuery(WorkshopEventBySlugDoc, {
    variables: { slug },
    fetchPolicy: 'network-only',
  });
  return { event: data?.workshopEventBySlug ?? null, loading, error };
};
