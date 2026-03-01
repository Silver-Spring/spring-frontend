'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { DeleteUserDoc } from '../graphql/delete-user.graphql';

export const useDeleteUser = () => {
  const [deleteUserMutation, { loading }] = useMutation(DeleteUserDoc, {
    onCompleted: (data) => {
      if (data.adminDeleteUser?.success) {
        toast.success(data.adminDeleteUser.message || 'User deleted successfully');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete user');
    },
    update: (cache, { data }) => {
      if (data?.adminDeleteUser?.success && data.adminDeleteUser.deletedUserId) {
        cache.evict({
          id: cache.identify({
            __typename: 'User',
            id: data.adminDeleteUser.deletedUserId,
          }),
        });
        cache.gc();
      }
    },
  });

  const deleteUser = async (userId: string) => {
    try {
      const result = await deleteUserMutation({
        variables: {
          input: { userId },
        },
      });
      return result.data?.adminDeleteUser;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  return { deleteUser, loading };
};
