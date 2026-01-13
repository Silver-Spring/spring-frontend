import { graphql } from "@/gql";

const CreatePaymentOrderDoc = graphql(`
  mutation CreatePaymentOrder {
    createPaymentOrder(input: {}) {
      orderId
      amount
      currency
      razorpayKeyId
    }
  }
`);

export { CreatePaymentOrderDoc };
