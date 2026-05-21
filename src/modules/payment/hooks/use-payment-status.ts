import { useQuery } from '@apollo/client/react';
import {
  AssessmentTypeCode,
  DEFAULT_ASSESSMENT_TYPE,
} from '@/modules/assessment/constants';
import { CheckPaymentStatusDoc } from '../graphql';

export const usePaymentStatus = (
  assessmentType: AssessmentTypeCode = DEFAULT_ASSESSMENT_TYPE
) => {
  const { data, loading, error, refetch } = useQuery(CheckPaymentStatusDoc, {
    variables: { assessmentType },
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
