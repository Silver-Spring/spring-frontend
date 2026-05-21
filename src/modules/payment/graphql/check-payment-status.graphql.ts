import { graphql } from '@/gql';

export const CheckPaymentStatusDoc = graphql(`
  query CheckPaymentStatus($assessmentType: String = "ssri") {
    currentUserPaymentStatus(assessmentType: $assessmentType) {
      hasPaid
      paymentId
      status
      amountInr
      createdAt
    }
  }
`);
