import { capturePaymentError } from '@/lib/analytics';
import { useMutation } from '@apollo/client/react';
import posthog from 'posthog-js';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { cleanupRazorpay, closeRazorpayInstance, initializeRazorpay, openRazorpayCheckout } from '@/modules/payment/utils';
import type { RazorpayErrorResponse, RazorpayInstance, RazorpaySuccessResponse } from '@/modules/payment/types';
import { CreateWorkbookOrderDoc } from '../graphql';
import { useVerifyWorkbookPayment } from './use-verify-workbook-payment';

export const useCreateWorkbookOrder = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { verifyWorkbookPayment } = useVerifyWorkbookPayment();
  const razorpayInstanceRef = useRef<RazorpayInstance | null>(null);

  useEffect(() => {
    return () => {
      if (razorpayInstanceRef.current) {
        closeRazorpayInstance(razorpayInstanceRef.current);
        razorpayInstanceRef.current = null;
        cleanupRazorpay();
      }
    };
  }, []);

  const [createOrderMutation, { loading }] = useMutation(CreateWorkbookOrderDoc, {
    onError: (err) => {
      capturePaymentError(err, undefined, undefined);
      const isDev = process.env.NODE_ENV === 'development';
      toast.error(
        isDev
          ? `Failed to create order. ${err.message}`
          : 'Failed to create order. Please try again.'
      );
      setIsProcessing(false);
    },
  });

  const createWorkbookOrder = async (
    onSuccess: () => void,
    onFailure?: (error: RazorpayErrorResponse | Error) => void,
    couponCode?: string,
    prefill?: { name?: string; email?: string }
  ) => {
    setIsProcessing(true);

    try {
      const isLoaded = await initializeRazorpay();
      if (!isLoaded) {
        toast.error('Failed to load payment gateway. Please refresh and try again.');
        setIsProcessing(false);
        return;
      }

      const result = await createOrderMutation({
        variables: { input: { couponCode: couponCode || undefined } },
      });

      const orderData = result.data?.createWorkbookOrder;
      if (!orderData) {
        throw new Error('Failed to create workbook order');
      }

      if (orderData.couponApplied && orderData.couponMessage) {
        toast.success(orderData.couponMessage);
      }

      // 100% coupon — backend already captured the purchase
      if (orderData.isFree) {
        posthog.capture('workbook_purchase_free', {
          coupon_applied: orderData.couponApplied,
        });
        toast.success('Workbook unlocked! Your download is ready.');
        setIsProcessing(false);
        onSuccess();
        return;
      }

      if (!orderData.orderId || !orderData.razorpayKeyId) {
        toast.error('Invalid order. Please try again.');
        setIsProcessing(false);
        return;
      }

      posthog.capture('workbook_payment_initiated', {
        order_id: orderData.orderId,
        amount: orderData.amount,
        coupon_applied: orderData.couponApplied,
      });

      razorpayInstanceRef.current = openRazorpayCheckout({
        keyId: orderData.razorpayKeyId,
        amount: orderData.amount,
        currency: orderData.currency,
        orderId: orderData.orderId,
        name: 'Silver Spring',
        description: 'Retirement Readiness Workbook',
        prefill: { name: prefill?.name ?? '', email: prefill?.email ?? '', contact: '' },
        onSuccess: async (response: RazorpaySuccessResponse) => {
          try {
            const verification = await verifyWorkbookPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );

            if (verification.success) {
              posthog.capture('workbook_purchase_completed', {
                order_id: response.razorpay_order_id,
                purchase_id: verification.purchaseId,
              });
              toast.success('Payment successful! Your workbook is ready.');
              onSuccess();
            } else {
              toast.error(verification.message || 'Payment verification failed. Please contact support.');
            }
          } catch (verifyError) {
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
          posthog.capture('workbook_payment_failed', {
            error_code: error.error?.code,
            error_reason: error.error?.reason,
          });
          setIsProcessing(false);
          closeRazorpayInstance(razorpayInstanceRef.current);
          razorpayInstanceRef.current = null;
          cleanupRazorpay();
          onFailure?.(error);
        },
      });
    } catch (error) {
      setIsProcessing(false);
      closeRazorpayInstance(razorpayInstanceRef.current);
      razorpayInstanceRef.current = null;
      cleanupRazorpay();
      onFailure?.(error instanceof Error ? error : new Error('Order failed'));
    }
  };

  return { createWorkbookOrder, isProcessing, loading };
};
