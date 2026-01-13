import { useQuery } from '@apollo/client/react';
import { CheckPaymentStatusDoc } from '../graphql';

/**
 * Hook to check if the current user has already paid for the assessment.
 * This should be called BEFORE showing payment UI to prevent duplicate payments.
 */
export const usePaymentStatus = () => {
  const { data, loading, error, refetch } = useQuery(CheckPaymentStatusDoc, {
    // Cache for 5 minutes to reduce unnecessary requests
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
  });

  const paymentStatus = data?.currentUserPaymentStatus;

  return {
    hasPaid: paymentStatus?.hasPaid || false,
    paymentId: paymentStatus?.paymentId || null,
    status: paymentStatus?.status || null,
    amountInr: paymentStatus?.amountInr || null,
    createdAt: paymentStatus?.createdAt || null,
    loading,
    error,
    refetch,
  };
};
