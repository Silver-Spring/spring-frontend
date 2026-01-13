import { useState } from 'react';
import { useCreatePaymentOrder } from './use-create-payment-order';
import type { RazorpayErrorResponse } from '../types';

/**
 * Simplified payment hook that provides a clean API for handling payments
 * This hook wraps useCreatePaymentOrder for convenience
 */
export const usePayment = () => {
  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);
  const { createPaymentOrder, isProcessing } = useCreatePaymentOrder();

  const initiatePayment = async (
    onSuccess?: (paymentId: string | null) => void,
    onFailure?: (error: RazorpayErrorResponse | Error) => void
  ) => {
    setIsPaymentInProgress(true);

    await createPaymentOrder(
      (paymentId) => {
        setIsPaymentInProgress(false);
        if (onSuccess) {
          onSuccess(paymentId);
        }
      },
      (error) => {
        setIsPaymentInProgress(false);
        if (onFailure) {
          onFailure(error);
        }
      }
    );
  };

  return {
    initiatePayment,
    isProcessing,
    isPaymentInProgress,
  };
};
