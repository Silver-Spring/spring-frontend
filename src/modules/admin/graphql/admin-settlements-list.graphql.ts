import { graphql } from '@/gql';

const AdminSettlementsListDoc = graphql(`
  query AdminSettlementsList($input: AdminPaymentsFilterInput) {
    adminSettlementsList(input: $input) {
      entity
      count
      items {
        id
        entity
        amount
        status
        fees
        tax
        utr
        createdAt
      }
    }
  }
`);

export { AdminSettlementsListDoc };
