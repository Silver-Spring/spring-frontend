import { useMutation, useApolloClient } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { toast } from 'sonner';
import { TOKEN_NAME } from '.';
import { LogoutDoc } from '../graphql';
import { useUserStore } from '@/stores';

export const useLogout = () => {
  const [, , deleteCookie] = useCookies();
  const client = useApolloClient();
  const clearUser = useUserStore((state) => state.clearUser);

  const router = useRouter();

  const [logoutMutation, { loading, error }] = useMutation(LogoutDoc, {
    onCompleted: () => {
      // Delete cookies
      deleteCookie(TOKEN_NAME, { path: '/' });
      deleteCookie('currentUserId', { path: '/' });

      // Clear the Apollo cache for currentUser
      client.cache.evict({ fieldName: 'currentUser' });
      client.cache.gc(); // Garbage collect to clean up orphaned references

      // Clear Zustand user store
      clearUser();

      toast.success('Logged out successfully');

      // Redirect to the main website after logout
      window.location.href = process.env.NEXT_PUBLIC_APP_URL || 'https://www.silverspring.in';
    },
    onError: (error) => {
      console.error('Logout error:', error);
      // Only show technical details in development
      const isDev = process.env.NODE_ENV === 'development';
      const errorMessage = isDev
        ? `Logout failed. ${error.message}`
        : 'Logout failed. Please try again.';
      toast.error(errorMessage);
    },
  });

  const logout = () => logoutMutation();

  return { logout, loading, error };
};

