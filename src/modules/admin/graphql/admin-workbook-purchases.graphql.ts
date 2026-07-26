import { graphql } from '@/gql';

const AdminWorkbookPurchasesDoc = graphql(`
  query AdminWorkbookPurchases($input: AdminWorkbookPurchasesFilterInput) {
    adminWorkbookPurchases(input: $input) {
      totalCount
      items {
        id
        userId
        userName
        userEmail
        userPhone
        amountInr
        originalAmountInr
        discountAmountInr
        status
        paymentMethod
        razorpayOrderId
        razorpayPaymentId
        couponCode
        errorCode
        errorDescription
        isFree
        createdAt
        updatedAt
      }
    }
  }
`);

export { AdminWorkbookPurchasesDoc };
