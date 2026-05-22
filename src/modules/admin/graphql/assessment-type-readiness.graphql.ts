import { graphql } from '@/gql';

const AssessmentTypeReadinessDoc = graphql(`
  query AssessmentTypeReadiness($type: String!) {
    assessmentTypeReadiness(assessmentType: $type) {
      code
      ready
      sectionCount
      requiredSectionBands
      stagesPerSection
      checks {
        key
        label
        passed
        detail
      }
    }
  }
`);

export { AssessmentTypeReadinessDoc };
