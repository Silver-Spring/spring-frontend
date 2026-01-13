import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { CreatePaymentOrderDoc } from '../graphql';
import { initializeRazorpay, openRazorpayCheckout } from '../utils';
import { useVerifyPayment } from './use-verify-payment';
import type { RazorpaySuccessResponse, RazorpayErrorResponse } from '../types';

export const useCreatePaymentOrder = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { verifyPayment } = useVerifyPayment();

  const [createOrderMutation, { data, loading, error }] = useMutation(CreatePaymentOrderDoc, {
    onError: (error) => {
      console.error('Payment order creation error:', error);
      // Only show technical details in development
      const isDev = process.env.NODE_ENV === 'development';
      const errorMessage = isDev
        ? `Failed to create payment order. ${error.message}`
        : 'Failed to create payment order. Please try again.';
      toast.error(errorMessage);
      setIsProcessing(false);
    },
  });

  const createPaymentOrder = async (
    onSuccess: (paymentId: string | null) => void,
    onFailure?: (error: RazorpayErrorResponse | Error) => void
  ) => {
    setIsProcessing(true);

    try {
      // Step 1: Initialize Razorpay script
      const isLoaded = await initializeRazorpay();
      if (!isLoaded) {
        toast.error('Failed to load payment gateway. Please refresh and try again.');
        setIsProcessing(false);
        return;
      }

      // Step 2: Create payment order via GraphQL (backend controls pricing)
      const result = await createOrderMutation();

      const orderData = result.data?.createPaymentOrder;
      if (!orderData) {
        throw new Error('Failed to create payment order');
      }

      // Step 3: Open Razorpay checkout modal
      openRazorpayCheckout({
        keyId: orderData.razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        orderId: orderData.orderId,
        name: 'Spring',
        description: 'Psychometric Assessment Test',
        prefill: {
          // These can be filled from current user context if needed
        },
        onSuccess: async (response: RazorpaySuccessResponse) => {
          try {
            // Step 4: Verify payment with backend
            const verificationResult = await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );

            if (verificationResult.success) {
              // Step 5: Notify success (no subscription to refetch)
              onSuccess(verificationResult.paymentId);
            } else {
              toast.error(
                verificationResult.message || 'Payment verification failed. Please contact support.'
              );
            }
          } catch (verifyError) {
            console.error('Payment verification error:', verifyError);
            toast.error('Failed to verify payment. Please contact support.');
          } finally {
            setIsProcessing(false);
          }
        },
        onFailure: (error) => {
          console.error('Payment failed:', error);
          const errorMessage =
            error.error?.description || 'Payment failed. Please try again.';
          toast.error(errorMessage);
          setIsProcessing(false);
          if (onFailure) {
            onFailure(error);
          }
        },
      });
    } catch (error) {
      console.error('Error in payment flow:', error);
      setIsProcessing(false);
      if (onFailure) {
        onFailure(error instanceof Error ? error : new Error('Payment failed'));
      }
    }
  };

  return {
    createPaymentOrder,
    isProcessing,
    data,
    loading,
    error,
  };
};
