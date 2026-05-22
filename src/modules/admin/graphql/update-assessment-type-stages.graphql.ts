import { graphql } from '@/gql';

const UpdateAssessmentTypeStagesDoc = graphql(`
  mutation UpdateAssessmentTypeStages($input: UpdateAssessmentTypeStagesInput!) {
    updateAssessmentTypeStages(input: $input) {
      success
      message
      stages {
        displayOrder
        label
        description
        sectionRangeStart
        sectionRangeEnd
        overallRangeStart
        overallRangeEnd
      }
    }
  }
`);

export { UpdateAssessmentTypeStagesDoc };
