import { ResetPasswordInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ResetPasswordDoc } from '../graphql';
import { resetPasswordSchema } from '../schema';

export const useResetPassword = () => {
  const router = useRouter();

  const [resetPasswordMutation, { data, loading, error }] = useMutation(ResetPasswordDoc, {
    onCompleted: (data) => {
      if (data.resetPassword?.success) {
        toast.success('Password reset successfully! Please log in with your new password.');
        router.replace('/auth/login');
      } else {
        toast.error('Password reset failed. Please check your reset token and try again.');
      }
    },
    onError: (error) => {
      console.error('Reset password error:', error);
      // Only show technical details in development
      const isDev = process.env.NODE_ENV === 'development';
      const errorMessage = isDev
        ? `Password reset failed. ${error.message}`
        : 'Password reset failed. Please check your reset link and try again.';
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (input: ResetPasswordInput & { confirmPassword: string }) => {
    // Validate the full input including confirmPassword
    const sanitizedInput = resetPasswordSchema.parse(input);

    // Remove confirmPassword before sending to the API
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword: _confirmPassword, ...apiInput } = sanitizedInput;

    resetPasswordMutation({
      variables: {
        input: apiInput,
      },
    });
  };

  const initialValues = {
    userId: '',
    resetToken: '',
    newPassword: '',
    confirmPassword: '',
  };

  return {
    initialValues,
    validationSchema: resetPasswordSchema,
    handleSubmit,
    loading,
    error,
    success: data?.resetPassword?.success,
  };
};
