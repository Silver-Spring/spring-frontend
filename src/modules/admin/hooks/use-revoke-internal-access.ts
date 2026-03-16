import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { RevokeInternalAccessDoc } from '../graphql/revoke-internal-access.graphql';

export const useRevokeInternalAccess = () => {
  const [revokeInternalAccessMutation, { data, loading, error }] = useMutation(
    RevokeInternalAccessDoc,
    {
      onCompleted: (data) => {
        if (data.revokeInternalAccess?.success) {
          toast.success(
            data.revokeInternalAccess.message || 'Internal access revoked successfully'
          );
        }
      },
      onError: (error) => {
        console.error('Error revoking internal access:', error);
        toast.error(error.message || 'Failed to revoke internal access');
      },
    }
  );

  const revokeInternalAccess = async (userId: string) => {
    try {
      const result = await revokeInternalAccessMutation({
        variables: { userId },
      });
      return result.data?.revokeInternalAccess || null;
    } catch (error) {
      console.error('Error in revokeInternalAccess:', error);
      throw error;
    }
  };

  return {
    revokeInternalAccess,
    loading,
    error,
    data,
  };
};
