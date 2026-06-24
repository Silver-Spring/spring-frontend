import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { VerifyWorkbookPaymentDoc } from '../graphql';
import { WorkbookStatusDoc } from '../graphql';

export const useVerifyWorkbookPayment = () => {
  const [verifyMutation, { loading, error }] = useMutation(VerifyWorkbookPaymentDoc, {
    onError: (err) => {
      const isDev = process.env.NODE_ENV === 'development';
      toast.error(
        isDev
          ? `Payment verification failed. ${err.message}`
          : 'Payment verification failed. Please contact support.'
      );
    },
    refetchQueries: [{ query: WorkbookStatusDoc }],
  });

  const verifyWorkbookPayment = async (orderId: string, paymentId: string, signature: string) => {
    const result = await verifyMutation({
      variables: { input: { orderId, paymentId, signature } },
    });

    return {
      success: result.data?.verifyWorkbookPayment?.success ?? false,
      purchaseId: result.data?.verifyWorkbookPayment?.purchaseId ?? null,
      message: result.data?.verifyWorkbookPayment?.message ?? null,
    };
  };

  return { verifyWorkbookPayment, loading, error };
};
