import { graphql } from '@/gql';

const SectionInterpretationBandsDoc = graphql(`
  query SectionInterpretationBands($type: String!) {
    assessmentInterpretationBands(
      condition: { assessmentTypeCode: $type, bandScope: "section" }
      orderBy: [SECTION_TYPE_ASC, DISPLAY_ORDER_ASC]
    ) {
      nodes {
        id
        sectionType
        label
        rangeStart
        rangeEnd
        narrative
        displayOrder
        isActive
        bandScope
        assessmentRecommendedActionsByInterpretationBandId(orderBy: [PRIORITY_ASC]) {
          nodes {
            id
            actionText
            priority
            isActive
          }
        }
      }
    }
  }
`);

const OverallInterpretationBandsDoc = graphql(`
  query OverallInterpretationBands($type: String!) {
    assessmentInterpretationBands(
      condition: { assessmentTypeCode: $type, bandScope: "overall" }
      orderBy: [DISPLAY_ORDER_ASC]
    ) {
      nodes {
        id
        label
        rangeStart
        rangeEnd
        displayRangeLabel
        narrative
        keyMindset
        displayOrder
        isActive
        bandScope
        assessmentRecommendedActionsByInterpretationBandId(orderBy: [PRIORITY_ASC]) {
          nodes {
            id
            actionText
            priority
            isActive
          }
        }
      }
    }
  }
`);

export { SectionInterpretationBandsDoc, OverallInterpretationBandsDoc };
