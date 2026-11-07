'use client';

import { useMutation, useQuery } from '@apollo/client/react';
import Cookies from 'js-cookie';
import { getApiBaseUrl } from '@/lib/api-base-url';
import { TOKEN_NAME } from '@/modules/auth/hooks';
import {
  AdminWorkshopEmailPendingCountDoc,
  AdminWorkshopRegistrationsDoc,
} from '../graphql/admin-workshop-registrations.graphql';
import {
  AdminDeleteWorkshopRegistrationDoc,
  AdminSendWorkshopEmailDoc,
} from '../graphql/admin-workshop-email-mutations.graphql';

export const WORKSHOP_EMAIL_TYPES = [
  'confirmation',
  'reminder_day_before',
  'reminder_hour_before',
  'thank_you',
] as const;
export type WorkshopEmailType = (typeof WORKSHOP_EMAIL_TYPES)[number];

export const useWorkshopRegistrations = (eventId: string) => {
  const { data, loading, refetch } = useQuery(AdminWorkshopRegistrationsDoc, {
    variables: { eventId },
    fetchPolicy: 'network-only',
  });
  return { registrations: data?.adminWorkshopRegistrations ?? [], loading, refetch };
};

export const useWorkshopPendingCount = (eventId: string, emailType: WorkshopEmailType) => {
  const { data, loading, refetch } = useQuery(AdminWorkshopEmailPendingCountDoc, {
    variables: { eventId, emailType },
    fetchPolicy: 'network-only',
  });
  return { pending: data?.adminWorkshopEmailPendingCount ?? 0, loading, refetch };
};

export const useSendWorkshopEmail = () => useMutation(AdminSendWorkshopEmailDoc);
export const useDeleteWorkshopRegistration = () => useMutation(AdminDeleteWorkshopRegistrationDoc);

/** Downloads the CSV with the admin's token, since the route needs an Authorization header. */
export const useDownloadRegistrationsCsv = () => {
  return async (eventId: string, slug: string) => {
    const response = await fetch(`${getApiBaseUrl()}/api/admin/workshops/${eventId}/registrations.csv`, {
      headers: { Authorization: `Bearer ${Cookies.get(TOKEN_NAME) ?? ''}` },
    });
    if (!response.ok) throw new Error('Could not download the CSV');
    const url = URL.createObjectURL(await response.blob());
    const link = document.createElement('a');
    link.href = url;
    link.download = `${slug}-registrations.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };
};
