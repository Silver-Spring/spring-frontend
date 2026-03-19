import { graphql } from '@/gql';

const AdminRefundsListDoc = graphql(`
  query AdminRefundsList($input: AdminPaymentsFilterInput) {
    adminRefundsList(input: $input) {
      entity
      count
      items {
        id
        entity
        amount
        currency
        paymentId
        status
        speedRequested
        speedProcessed
        createdAt
      }
    }
  }
`);

export { AdminRefundsListDoc };
