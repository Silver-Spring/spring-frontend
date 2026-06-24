import { graphql } from '@/gql';

const VerifyWorkbookPaymentDoc = graphql(`
  mutation VerifyWorkbookPayment($input: VerifyWorkbookPaymentInput!) {
    verifyWorkbookPayment(input: $input) {
      success
      purchaseId
      message
    }
  }
`);

export { VerifyWorkbookPaymentDoc };
