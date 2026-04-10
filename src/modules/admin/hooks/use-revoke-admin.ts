'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { RevokeAdminDoc } from '../graphql/revoke-admin.graphql';
import posthog from 'posthog-js';

export const useRevokeAdmin = () => {
  const [revokeAdminMutation, { loading }] = useMutation(RevokeAdminDoc, {
    onCompleted: (data) => {
      if (data.revokeAdminAccess?.success) {
        posthog.capture('admin_access_revoked', {
          target_user_id: data.revokeAdminAccess.user?.id,
          target_user_email: data.revokeAdminAccess.user?.email,
        });
        toast.success(data.revokeAdminAccess.message || 'Admin access revoked successfully');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to revoke admin access');
    },
  });

  const revokeAdmin = async (userId: string) => {
    try {
      const result = await revokeAdminMutation({
        variables: { userId },
      });
      return result.data?.revokeAdminAccess;
    } catch (error) {
      console.error('Error revoking admin access:', error);
      throw error;
    }
  };

  return { revokeAdmin, loading };
};
