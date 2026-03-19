'use client';

import { useLazyQuery } from '@apollo/client/react';
import { AdminPaymentDetailsDoc } from '../graphql/admin-payment-details.graphql';

export const useAdminPaymentDetails = () => {
  const [fetchPaymentDetails, { data, loading, error }] = useLazyQuery(
    AdminPaymentDetailsDoc,
    {
      fetchPolicy: 'network-only',
    }
  );

  const getPaymentDetails = async (paymentId: string) => {
    const result = await fetchPaymentDetails({
      variables: { paymentId },
    });

    if (result.data?.adminPaymentDetails) {
      return {
        razorpayData: result.data.adminPaymentDetails.razorpayData
          ? JSON.parse(result.data.adminPaymentDetails.razorpayData)
          : null,
        dbData: result.data.adminPaymentDetails.dbData
          ? JSON.parse(result.data.adminPaymentDetails.dbData)
          : null,
      };
    }

    return null;
  };

  return {
    getPaymentDetails,
    loading,
    error,
  };
};
