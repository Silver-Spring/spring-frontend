import { graphql } from '@/gql';

const SeedAssessmentTypeSectionsDoc = graphql(`
  mutation SeedAssessmentTypeSections($input: SeedAssessmentTypeSectionsInput!) {
    seedAssessmentTypeSections(input: $input) {
      success
      message
      sectionsCreated
    }
  }
`);

export { SeedAssessmentTypeSectionsDoc };
