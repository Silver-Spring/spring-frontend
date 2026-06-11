import { useState } from 'react';
import { AssessmentTypeCode, DEFAULT_ASSESSMENT_TYPE } from '@/modules/assessment/constants';
import type { RazorpayErrorResponse } from '../types';
import { useCreatePaymentOrder } from './use-create-payment-order';

export const usePayment = () => {
  const [isPaymentInProgress, setIsPaymentInProgress] = useState(false);
  const { createPaymentOrder, isProcessing } = useCreatePaymentOrder();

  const initiatePayment = async (
    onSuccess?: (paymentId: string | null) => void,
    onFailure?: (error: RazorpayErrorResponse | Error) => void,
    couponCode?: string,
    assessmentType: AssessmentTypeCode = DEFAULT_ASSESSMENT_TYPE
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
      couponCode,
      assessmentType
    );
  };

  return {
    initiatePayment,
    isProcessing,
    isPaymentInProgress,
  };
};
