import { graphql } from '@/gql';

const GetAllSectionsDoc = graphql(`
  query GetAllSections {
    assessmentSections(orderBy: DISPLAY_ORDER_ASC) {
      nodes {
        id
        type
        name
        description
        displayOrder
        isActive
      }
    }
  }
`);

export { GetAllSectionsDoc };
