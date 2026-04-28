import { useState } from 'react';
import type { RazorpayErrorResponse } from '../types';
import { useCreatePaymentOrder } from './use-create-payment-order';

export const usePayment = () => {
  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);
  const { createPaymentOrder, isProcessing } = useCreatePaymentOrder();

  const initiatePayment = async (
    onSuccess?: (paymentId: string | null) => void,
    onFailure?: (error: RazorpayErrorResponse | Error) => void,
    couponCode?: string
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
      },
      couponCode
    );
  };

  return {
    initiatePayment,
    isProcessing,
    isPaymentInProgress,
  };
};
