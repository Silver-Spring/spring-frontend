import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { VerifyPaymentDoc, CheckPaymentStatusDoc } from '../graphql';

export const useVerifyPayment = () => {
  const [verifyPaymentMutation, { data, loading, error }] = useMutation(VerifyPaymentDoc, {
    onCompleted: async (data) => {
      if (!data.verifyPayment?.success) {
        toast.error('Payment verification failed. Please contact support.');
      }
    },
    onError: (error) => {
      console.error('Payment verification error:', error);
      // Only show technical details in development
      const isDev = process.env.NODE_ENV === 'development';
      const errorMessage = isDev
        ? `Payment verification failed. ${error.message}`
        : 'Payment verification failed. Please contact support.';
      toast.error(errorMessage);
    },
    // Optimistic UI update: immediately update cache on successful verification
    update(cache, { data }) {
      if (data?.verifyPayment?.success && data.verifyPayment.paymentId) {
        cache.writeQuery({
          query: CheckPaymentStatusDoc,
          data: {
            currentUserPaymentStatus: {
              hasPaid: true,
              paymentId: data.verifyPayment.paymentId,
              status: 'captured',
              amountInr: null, // Will be updated on refetch
              createdAt: new Date().toISOString(),
              __typename: 'UserPaymentStatusPayload',
            },
          },
        });
      }
    },
  });

  const verifyPayment = async (
    orderId: string,
    paymentId: string,
    signature: string
  ) => {
    const result = await verifyPaymentMutation({
      variables: {
        orderId,
        paymentId,
        signature,
      },
    });

    return {
      success: result.data?.verifyPayment?.success || false,
      paymentId: result.data?.verifyPayment?.paymentId || null,
      message: result.data?.verifyPayment?.message || null,
    };
  };

  return {
    verifyPayment,
    loading,
    error,
    data,
  };
};
