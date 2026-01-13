import { useFragment } from '@/gql';
import { RegisterInput } from '@/gql/graphql';
import { useMutation, useApolloClient } from '@apollo/client/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { toast } from 'sonner';
import { TOKEN_NAME } from '.';
import { LiteUserDoc, SignupDoc } from '../graphql';
import { registerSchema } from '../schema';
import { useUserStore } from '@/stores';

export const useRegister = () => {
  const [, setCookies] = useCookies();
  const client = useApolloClient();
  const setUser = useUserStore((state) => state.setUser);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [register, { data, loading, error }] = useMutation(SignupDoc, {
    onCompleted: (data) => {
      // Use readFragment to access the user data
      const user = data.register?.user
        ? client.cache.readFragment({
          id: client.cache.identify(data.register.user),
          fragment: LiteUserDoc,
        })
        : null;

      // Set cookies - Apollo middleware will automatically pick them up on next request
      setCookies(TOKEN_NAME, data.register?.token, { path: '/' });
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
        });
      }

      toast.success('Registered successfully');

      // Redirect to the URL from query param or default to home
      const redirectUrl = searchParams.get('redirect') || '/';

      // Refresh the router to invalidate Next.js cache and re-render
      // The useCurrentUser query will automatically include the auth token now
      router.refresh();
      router.replace(redirectUrl);
    },
    onError: (error) => {
      console.error('Registration error:', error);
      // Only show technical details in development
      const isDev = process.env.NODE_ENV === 'development';
      const errorMessage = isDev
        ? `Registration failed. ${error.message}`
        : 'Registration failed. Please try again.';
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (input: RegisterInput & { confirmPassword: string }) => {
    // Validate the full input including confirmPassword
    const sanitizedInput = registerSchema.parse(input);

    // Remove confirmPassword before sending to the API
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword: _confirmPassword, ...apiInput } = sanitizedInput;

    register({
      variables: {
        input: apiInput,
      },
    });
  };

  // Use useFragment at the top level, not conditionally
  const userFragment = useFragment(LiteUserDoc, data?.register?.user);
  const user = data?.register?.user ? userFragment : undefined;

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: undefined as number | undefined,
    gender: undefined as 'male' | 'female' | 'other' | 'prefer_not_to_say' | undefined,
  };

  return {
    initialValues,
    validationSchema: registerSchema,
    handleSubmit,
    user,
    loading,
    error,
  };
};
