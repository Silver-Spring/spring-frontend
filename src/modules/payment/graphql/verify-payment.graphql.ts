import { graphql } from "@/gql";

const VerifyPaymentDoc = graphql(`
  mutation VerifyPayment(
    $orderId: String!
    $paymentId: String!
    $signature: String!
  ) {
    verifyPayment(
      input: {
        orderId: $orderId
        paymentId: $paymentId
        signature: $signature
      }
    ) {
      success
      paymentId
      message
    }
  }
`);

export { VerifyPaymentDoc };
