import { graphql } from '@/gql';

const WorkbookStatusDoc = graphql(`
  query WorkbookStatus {
    currentUserWorkbookStatus {
      hasPurchased
      purchasedAt
      purchaseId
    }
  }
`);

export { WorkbookStatusDoc };
