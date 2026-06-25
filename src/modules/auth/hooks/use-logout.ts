import { useMutation, useApolloClient } from '@apollo/client/react';
import { useCookies } from 'react-cookie';
import { toast } from 'sonner';
import { TOKEN_NAME } from '.';
import { LogoutDoc } from '../graphql';
import { useUserStore } from '@/stores';
import posthog from 'posthog-js';

export const useLogout = () => {
  const [, , deleteCookie] = useCookies();
  const client = useApolloClient();
  const clearUser = useUserStore((state) => state.clearUser);

  const [logoutMutation, { loading, error }] = useMutation(LogoutDoc, {
    onCompleted: () => {
      // Delete cookies
      deleteCookie(TOKEN_NAME, { path: '/' });
      deleteCookie('currentUserId', { path: '/' });

      // Wipe the entire Apollo cache — prevents cached data from leaking
      // to the next user on a shared device.
      client.clearStore();

      // Clear Zustand user store
      clearUser();

      posthog.capture('user_logged_out');
      posthog.reset();

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

