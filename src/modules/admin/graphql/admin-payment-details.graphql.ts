import { graphql } from '@/gql';

const AdminPaymentDetailsDoc = graphql(`
  query AdminPaymentDetails($paymentId: String!) {
    adminPaymentDetails(paymentId: $paymentId) {
      razorpayData
      dbData
    }
  }
`);

export { AdminPaymentDetailsDoc };
