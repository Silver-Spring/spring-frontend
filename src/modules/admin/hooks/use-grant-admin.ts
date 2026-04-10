'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { GrantAdminDoc } from '../graphql/grant-admin.graphql';
import posthog from 'posthog-js';

export const useGrantAdmin = () => {
  const [grantAdminMutation, { loading }] = useMutation(GrantAdminDoc, {
    onCompleted: (data) => {
      if (data.grantAdminAccess?.success) {
        posthog.capture('admin_access_granted', {
          target_user_id: data.grantAdminAccess.user?.id,
          target_user_email: data.grantAdminAccess.user?.email,
        });
        toast.success(data.grantAdminAccess.message || 'Admin access granted successfully');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to grant admin access');
    },
  });

  const grantAdmin = async (userId: string) => {
    try {
      const result = await grantAdminMutation({
        variables: { userId },
      });
      return result.data?.grantAdminAccess;
    } catch (error) {
      console.error('Error granting admin access:', error);
      throw error;
    }
  };

  return { grantAdmin, loading };
};
