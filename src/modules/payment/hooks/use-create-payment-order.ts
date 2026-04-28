import { capturePaymentError } from '@/lib/analytics';
import { useMutation } from '@apollo/client/react';
import posthog from 'posthog-js';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { CreatePaymentOrderDoc } from '../graphql';
import type { RazorpayErrorResponse, RazorpaySuccessResponse } from '../types';
import { cleanupRazorpay, closeRazorpayInstance, initializeRazorpay, openRazorpayCheckout } from '../utils';
import { useVerifyPayment } from './use-verify-payment';

export const useCreatePaymentOrder = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { verifyPayment } = useVerifyPayment();
  const razorpayInstanceRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (razorpayInstanceRef.current) {
        closeRazorpayInstance(razorpayInstanceRef.current);
        razorpayInstanceRef.current = null;
        cleanupRazorpay();
      }
    };
  }, []);

  const [createOrderMutation, { data, loading, error }] = useMutation(CreatePaymentOrderDoc, {
    onError: (error) => {
      console.error('Payment order creation error:', error);

      capturePaymentError(error, undefined, undefined);

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
    onFailure?: (error: RazorpayErrorResponse | Error) => void,
    couponCode?: string
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
      const result = await createOrderMutation({
        variables: {
          input: {
            couponCode: couponCode || undefined,
          },
        },
      });

      const orderData = result.data?.createPaymentOrder;
      if (!orderData) {
        throw new Error('Failed to create payment order');
      }

      // Step 3: Handle free payment (100% discount)
      if (orderData.isFree) {
        posthog.capture('payment_completed_free', {
          amount: 0,
          original_amount: orderData.originalAmount,
          discount_amount: orderData.discountAmount,
          coupon_applied: orderData.couponApplied,
        });

        // Show success message
        toast.success(
          orderData.couponMessage || 'Payment completed! Assessment is now FREE (100% discount)'
        );

        setIsProcessing(false);

        // Notify success with null paymentId (backend auto-created payment)
        onSuccess(null);
        return;
      }

      // Step 4: Validate minimum Razorpay amount for paid orders (₹1 = 100 paise)
      if (orderData.amount < 100) {
        toast.error('Payment amount must be at least ₹1. Please contact support.');
        setIsProcessing(false);
        return;
      }

      // Step 5: Open Razorpay checkout modal
      posthog.capture('payment_initiated', {
        order_id: orderData.orderId,
        amount: orderData.amount,
        currency: orderData.currency,
        coupon_applied: orderData.couponApplied,
        discount_amount: orderData.discountAmount,
      });

      // Show coupon success message if applied
      if (orderData.couponApplied && orderData.couponMessage) {
        toast.success(orderData.couponMessage);
      }

      // Ensure we have valid Razorpay credentials (should not be null for paid orders)
      if (!orderData.orderId || !orderData.razorpayKeyId) {
        toast.error('Invalid payment order. Please try again.');
        setIsProcessing(false);
        return;
      }

      razorpayInstanceRef.current = openRazorpayCheckout({
        keyId: orderData.razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        orderId: orderData.orderId,
        name: 'Silver Spring',
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
              posthog.capture('payment_completed', {
                order_id: response.razorpay_order_id,
                payment_id: verificationResult.paymentId,
              });
              // Step 5: Notify success (no subscription to refetch)
              onSuccess(verificationResult.paymentId);
            } else {
              toast.error(
                verificationResult.message || 'Payment verification failed. Please contact support.'
              );
            }
          } catch (verifyError) {
            console.error('Payment verification error:', verifyError);
            posthog.captureException(verifyError);
            toast.error('Failed to verify payment. Please contact support.');
          } finally {
            setIsProcessing(false);
            closeRazorpayInstance(razorpayInstanceRef.current);
            razorpayInstanceRef.current = null;
            cleanupRazorpay();
          }
        },
        onFailure: (error) => {
          posthog.capture('payment_failed', {
            error_code: error.error?.code,
            error_description: error.error?.description,
            error_reason: error.error?.reason,
          });
          setIsProcessing(false);
          closeRazorpayInstance(razorpayInstanceRef.current);
          razorpayInstanceRef.current = null;
          cleanupRazorpay();
          if (onFailure) {
            onFailure(error);
          }
        },
      });
    } catch (error) {
      console.error('Error in payment flow:', error);
      setIsProcessing(false);
      closeRazorpayInstance(razorpayInstanceRef.current);
      razorpayInstanceRef.current = null;
      cleanupRazorpay();
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
