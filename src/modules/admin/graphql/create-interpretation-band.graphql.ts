import { graphql } from '@/gql';

const CreateInterpretationBandDoc = graphql(`
  mutation CreateInterpretationBand($input: CreateInterpretationBandInput!) {
    createInterpretationBand(input: $input) {
      success
      message
      band {
        id
        assessmentTypeCode
        bandScope
        sectionType
        label
        rangeStart
        rangeEnd
        displayRangeLabel
        narrative
        keyMindset
        displayOrder
        isActive
      }
    }
  }
`);

export { CreateInterpretationBandDoc };
