import { useMutation, useApolloClient } from '@apollo/client/react';
import { useUserStore } from '@/stores';
import { toast } from 'sonner';
import { UpdatePhoneNumberDoc, LiteUserDoc } from '../graphql';
import { useFragment } from '@/gql';

export const useUpdatePhoneNumber = () => {
  const client = useApolloClient();
  const setUser = useUserStore((state) => state.setUser);
  const currentUser = useUserStore((state) => state.user);

  const [updatePhoneNumber, { data, loading, error }] = useMutation(UpdatePhoneNumberDoc, {
    onCompleted: (data) => {
      toast.success('Phone number updated successfully');
    },
    onError: (error) => {
      console.error('Update phone number error:', error);
      const isDev = process.env.NODE_ENV === 'development';
      const errorMessage = isDev
        ? `Failed to update phone number. ${error.message}`
        : 'Failed to update phone number. Please try again.';
      toast.error(errorMessage);
    },
  });

  const userFragment = useFragment(LiteUserDoc, data?.updateUser?.user);
  const updatedUser = data?.updateUser?.user ? userFragment : null;

  const handleUpdatePhoneNumber = async (phoneNumber: string) => {
    if (!currentUser?.id) {
      toast.error('User not found. Please log in again.');
      return;
    }

    // Prepend +91 country code to phone number
    const phoneNumberWithCode = `+91${phoneNumber}`;

    await updatePhoneNumber({
      variables: {
        userId: currentUser.id,
        phoneNumber: phoneNumberWithCode,
      },
    });

    if (updatedUser && currentUser) {
      setUser({
        ...currentUser,
        phoneNumber: updatedUser.phoneNumber,
      });
    }
  };

  return {
    handleUpdatePhoneNumber,
    loading,
    error,
  };
};
