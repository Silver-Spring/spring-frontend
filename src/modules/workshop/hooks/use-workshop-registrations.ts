'use client';

import { useMutation, useQuery } from '@apollo/client/react';
import Cookies from 'js-cookie';
import { getApiBaseUrl } from '@/lib/api-base-url';
import { TOKEN_NAME } from '@/modules/auth/hooks';
import { AdminWorkshopRegistrationsDoc } from '../graphql/admin-workshop-registrations.graphql';
import {
  AdminDeleteWorkshopRegistrationDoc,
  AdminResendWorkshopConfirmationsDoc,
} from '../graphql/admin-workshop-email-mutations.graphql';

export const useWorkshopRegistrations = (eventId: string) => {
  const { data, loading, refetch } = useQuery(AdminWorkshopRegistrationsDoc, {
    variables: { eventId },
    fetchPolicy: 'network-only',
  });
  return { registrations: data?.adminWorkshopRegistrations ?? [], loading, refetch };
};

export const useResendWorkshopConfirmations = () =>
  useMutation(AdminResendWorkshopConfirmationsDoc);
export const useDeleteWorkshopRegistration = () => useMutation(AdminDeleteWorkshopRegistrationDoc);

/** Downloads the CSV with the admin's token, since the route needs an Authorization header. */
export const useDownloadRegistrationsCsv = () => {
  return async (eventId: string, slug: string) => {
    const response = await fetch(
      `${getApiBaseUrl()}/api/admin/workshops/${eventId}/registrations.csv`,
      {
        headers: { Authorization: `Bearer ${Cookies.get(TOKEN_NAME) ?? ''}` },
      }
    );
    if (!response.ok) throw new Error('Could not download the CSV');
    const url = URL.createObjectURL(await response.blob());
    const link = document.createElement('a');
    link.href = url;
    link.download = `${slug}-registrations.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };
};
