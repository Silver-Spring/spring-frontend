import { graphql } from '@/gql';

const AssessmentSectionPresetsDoc = graphql(`
  query AssessmentSectionPresets {
    assessmentSectionPresets {
      type
      name
      description
      displayOrder
    }
  }
`);

export { AssessmentSectionPresetsDoc };
