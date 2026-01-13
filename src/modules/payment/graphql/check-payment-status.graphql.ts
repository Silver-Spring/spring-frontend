import { graphql } from '@/gql';

export const CheckPaymentStatusDoc = graphql(`
  query CheckPaymentStatus {
    currentUserPaymentStatus {
      hasPaid
      paymentId
      status
      amountInr
      createdAt
    }
  }
`);
