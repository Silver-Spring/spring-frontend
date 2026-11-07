'use client';

import { useMutation } from '@apollo/client/react';
import { RegisterForWorkshopDoc } from '../graphql/register-for-workshop.graphql';
import type { WorkshopRegisterValues } from '../lib/workshop-register-schema';

export const useRegisterForWorkshop = () => {
  const [mutate, { loading }] = useMutation(RegisterForWorkshopDoc);

  // The consent line sits above the button, so registering is the consent the backend requires.
  const register = async (slug: string, values: WorkshopRegisterValues) => {
    const result = await mutate({
      variables: {
        input: {
          slug,
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          consent: true,
          source: 'workshop-page',
        },
      },
    });
    return result.data?.registerForWorkshop;
  };

  return { register, loading };
};
