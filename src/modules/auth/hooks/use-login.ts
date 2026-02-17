import { useRouter, useSearchParams } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { TOKEN_NAME } from '.';
import { toast } from 'sonner';
import { loginSchema } from '../schema';
import { useMutation, useApolloClient } from '@apollo/client/react';
import { LoginDoc, LiteUserDoc } from '../graphql';
import { LoginInput } from '@/gql/graphql';
import { useFragment } from '@/gql';
import { useUserStore } from '@/stores';

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
        });
      }

      toast.success('Logged in successfully');

      // Redirect to the URL from query param or default to home
      const redirectUrl = searchParams.get('redirect') || '/';

      // Refresh the router to invalidate Next.js cache and re-render
      // The useCurrentUser query will automatically include the auth token now
      router.refresh();
      router.replace(redirectUrl);
    },
    onError: (error) => {
      console.error('Login error:', error);
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
