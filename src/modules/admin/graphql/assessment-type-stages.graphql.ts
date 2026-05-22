import { graphql } from '@/gql';

const AssessmentTypeStagesDoc = graphql(`
  query AssessmentTypeStages($assessmentTypeCode: String!) {
    assessmentTypeStages(assessmentTypeCode: $assessmentTypeCode) {
      id
      assessmentTypeCode
      displayOrder
      label
      description
      sectionRangeStart
      sectionRangeEnd
      overallRangeStart
      overallRangeEnd
    }
  }
`);

export { AssessmentTypeStagesDoc };
