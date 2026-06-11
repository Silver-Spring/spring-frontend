import { graphql } from '@/gql';

const GetAllSectionsDoc = graphql(`
  query GetAllSections($assessmentType: String = "ssri") {
    assessmentSections(
      condition: { assessmentTypeCode: $assessmentType }
      orderBy: DISPLAY_ORDER_ASC
    ) {
      nodes {
        id
        type
        name
        description
        aboutDescription
        subtitle
        emoji
        displayColor
        displayOrder
        isActive
        sectionCategory
        assessmentTypeCode
      }
    }
  }
`);

export { GetAllSectionsDoc };
