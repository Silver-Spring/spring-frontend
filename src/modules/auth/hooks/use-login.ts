import { useRouter, useSearchParams } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { TOKEN_NAME } from '.';
import { toast } from 'sonner';
import { loginSchema } from '../schema';
import { useMutation, useApolloClient } from '@apollo/client/react';
import { LoginDoc, LiteUserDoc, CurrentUserDoc } from '../graphql';
import { LoginInput } from '@/gql/graphql';
import { useFragment } from '@/gql';
import { useUserStore } from '@/stores';
import posthog from 'posthog-js';
import { captureAuthError } from '@/lib/analytics';

export const useLogin = () => {
  const [, setCookies] = useCookies();
  const client = useApolloClient();
  const setUser = useUserStore((state) => state.setUser);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [loginMutation, { data, loading, error }] = useMutation(LoginDoc, {
    onCompleted: (data) => {
      // Use readFragment to access the user data
      const user = data.login?.user
        ? client.cache.readFragment({
          id: client.cache.identify(data.login.user),
          fragment: LiteUserDoc,
        })
        : null;

      // Set cookies - Apollo middleware will automatically pick them up on next request
      setCookies(TOKEN_NAME, data.login?.token, { path: '/' });
      setCookies('currentUserId', user?.id, { path: '/' });

      // Write currentUser to Apollo cache so useCurrentUser doesn't need to fetch
      if (user) {
        client.cache.writeQuery({
          query: CurrentUserDoc,
          data: {
            currentUser: user,
          },
        });
      }

      // Update Zustand store with user data
      if (user) {
        setUser({
          id: user.id,
          name: user.name,
          email: user.email,
          age: user.age,
          gender: user.gender,
          type: user.type,
          isAdmin: user.isAdmin,
          phoneNumber: user.phoneNumber,
          isInternal: user.isInternal,
        });

        posthog.identify(user.id, {
          email: user.email,
          name: user.name,
          gender: user.gender,
          age: user.age,
          is_admin: user.isAdmin,
          is_internal: user.isInternal,
        });
        posthog.capture('user_logged_in', {
          user_id: user.id,
          email: user.email,
        });
      }

      toast.success('Logged in successfully');

      // Redirect to the URL from query param or default to assessment
      const redirectUrl = searchParams.get('redirect') || '/assessment';

      // Refresh the router to invalidate Next.js cache and re-render
      // The useCurrentUser query will automatically include the auth token now
      router.refresh();
      router.replace(redirectUrl);
    },
    onError: (error) => {
      console.error('Login error:', error);

      captureAuthError({ ...error }, 'login');

      // Only show technical details in development
      const isDev = process.env.NODE_ENV === 'development';
      const errorMessage = isDev
        ? `Login failed. ${error.message}`
        : 'Login failed. Please check your credentials and try again.';
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (input: LoginInput) => {
    const sanitizedInput = loginSchema.parse(input);

    loginMutation({
      variables: {
        input: sanitizedInput,
      },
    });
  };

  // Use useFragment at the top level, not conditionally
  const userFragment = useFragment(LiteUserDoc, data?.login?.user);
  const user = data?.login?.user ? userFragment : undefined;

  const initialValues = {
    email: '',
    password: '',
  };

  return {
    initialValues,
    validationSchema: loginSchema,
    handleSubmit,
    user,
    loading,
    error,
  };
};
