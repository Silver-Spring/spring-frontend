import { graphql } from '@/gql';

const SeedAssessmentTypeContentDoc = graphql(`
  mutation SeedAssessmentTypeContent($input: SeedAssessmentTypeContentInput!) {
    seedAssessmentTypeContent(input: $input) {
      success
      message
      assessmentType {
        code
        name
        isActive
      }
    }
  }
`);

export { SeedAssessmentTypeContentDoc };
