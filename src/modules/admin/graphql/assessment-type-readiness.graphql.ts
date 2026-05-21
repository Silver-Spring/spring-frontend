import { graphql } from '@/gql';

const AssessmentTypeReadinessDoc = graphql(`
  query AssessmentTypeReadiness($type: String!) {
    assessmentTypeReadiness(assessmentType: $type) {
      code
      ready
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
