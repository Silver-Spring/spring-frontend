'use client';

import { useMutation, useQuery } from '@apollo/client/react';
import { useFragment as unmaskFragment } from '@/gql';
import { AdminWorkshopEventFragment } from '../graphql/admin-workshop-fields.graphql';
import {
  AdminWorkshopEventDoc,
  AdminWorkshopEventsDoc,
} from '../graphql/admin-workshop-events.graphql';
import {
  AdminCreateWorkshopEventDoc,
  AdminDeleteWorkshopEventDoc,
  AdminSetWorkshopEventStatusDoc,
  AdminUpdateWorkshopEventDoc,
} from '../graphql/admin-workshop-mutations.graphql';

export const useAdminWorkshopEvents = () => {
  const { data, loading, refetch } = useQuery(AdminWorkshopEventsDoc, {
    fetchPolicy: 'network-only',
  });
  const workshops = (data?.adminWorkshopEvents ?? []).map((w) => unmaskFragment(AdminWorkshopEventFragment, w));
  return { workshops, loading, refetch };
};

export const useAdminWorkshopEvent = (id: string) => {
  const { data, loading } = useQuery(AdminWorkshopEventDoc, {
    variables: { id },
    fetchPolicy: 'network-only',
  });
  const workshop = data?.adminWorkshopEvent
    ? unmaskFragment(AdminWorkshopEventFragment, data.adminWorkshopEvent)
    : null;
  return { workshop, loading };
};

export const useCreateWorkshop = () => useMutation(AdminCreateWorkshopEventDoc);
export const useUpdateWorkshop = () => useMutation(AdminUpdateWorkshopEventDoc);
export const useSetWorkshopStatus = () => useMutation(AdminSetWorkshopEventStatusDoc);
export const useDeleteWorkshop = () => useMutation(AdminDeleteWorkshopEventDoc);
