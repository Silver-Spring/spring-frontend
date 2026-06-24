import { graphql } from '@/gql';

const CreateWorkbookOrderDoc = graphql(`
  mutation CreateWorkbookOrder($input: CreateWorkbookOrderInput!) {
    createWorkbookOrder(input: $input) {
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

export { CreateWorkbookOrderDoc };
