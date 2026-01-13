import { ForgotPasswordInput } from '@/gql/graphql';
import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ForgotPasswordDoc } from '../graphql';
import { forgotPasswordSchema } from '../schema';

export const useForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);

  const [forgotPasswordMutation, { data, loading, error }] = useMutation(ForgotPasswordDoc, {
    onCompleted: (data) => {
      if (data.forgotPassword?.success) {
        setEmailSent(true);
        // Always show the same message for security (prevent email enumeration)
        toast.success(
          'If your email is registered, you will receive a password reset link shortly. Please check your inbox.'
        );
      }
    },
    onError: (error) => {
      console.error('Forgot password error:', error);
      // Only show technical details in development
      const isDev = process.env.NODE_ENV === 'development';
      const errorMessage = isDev
        ? `Failed to send reset email. ${error.message}`
        : 'An error occurred. Please try again later.';
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (input: ForgotPasswordInput) => {
    const sanitizedInput = forgotPasswordSchema.parse(input);

    forgotPasswordMutation({
      variables: {
        input: sanitizedInput,
      },
    });
  };

  const initialValues = {
    email: '',
  };

  return {
    initialValues,
    validationSchema: forgotPasswordSchema,
    handleSubmit,
    loading,
    error,
    emailSent,
    success: data?.forgotPassword?.success,
  };
};
