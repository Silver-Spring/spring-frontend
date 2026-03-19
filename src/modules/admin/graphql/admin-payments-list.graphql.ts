import { graphql } from '@/gql';

const AdminPaymentsListDoc = graphql(`
  query AdminPaymentsList($input: AdminPaymentsFilterInput) {
    adminPaymentsList(input: $input) {
      entity
      count
      items {
        id
        entity
        amount
        currency
        status
        orderId
        method
        email
        contact
        fee
        tax
        errorCode
        errorDescription
        errorSource
        errorStep
        errorReason
        captured
        refundStatus
        amountRefunded
        createdAt
        notes
      }
    }
  }
`);

export { AdminPaymentsListDoc };
