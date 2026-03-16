import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { GrantInternalAccessDoc } from '../graphql/grant-internal-access.graphql';

export const useGrantInternalAccess = () => {
  const [grantInternalAccessMutation, { data, loading, error }] = useMutation(
    GrantInternalAccessDoc,
    {
      onCompleted: (data) => {
        if (data.grantInternalAccess?.success) {
          toast.success(
            data.grantInternalAccess.message || 'Internal access granted successfully'
          );
        }
      },
      onError: (error) => {
        console.error('Error granting internal access:', error);
        toast.error(error.message || 'Failed to grant internal access');
      },
    }
  );

  const grantInternalAccess = async (userId: string) => {
    try {
      const result = await grantInternalAccessMutation({
        variables: { userId },
      });
      return result.data?.grantInternalAccess || null;
    } catch (error) {
      console.error('Error in grantInternalAccess:', error);
      throw error;
    }
  };

  return {
    grantInternalAccess,
    loading,
    error,
    data,
  };
};
