import { graphql } from "@/gql";

const CreatePaymentOrderDoc = graphql(`
  mutation CreatePaymentOrder($input: CreatePaymentOrderInput!) {
    createPaymentOrder(input: $input) {
      orderId
      amount
      originalAmount
      discountAmount
      currency
      razorpayKeyId
      couponApplied
      couponMessage
      isFree
    }
  }
`);

export { CreatePaymentOrderDoc };
