import { graphql } from '@/gql';

const RecomputeAutoStageRangesDoc = graphql(`
  mutation RecomputeAutoStageRanges($assessmentTypeCode: String!) {
    recomputeAutoStageRanges(assessmentTypeCode: $assessmentTypeCode) {
      success
      message
      stages {
        displayOrder
        label
        sectionRangeStart
        sectionRangeEnd
        overallRangeStart
        overallRangeEnd
      }
    }
  }
`);

export { RecomputeAutoStageRangesDoc };
