import { graphql } from '@/gql';

const UpdateInterpretationBandDoc = graphql(`
  mutation UpdateInterpretationBand($input: UpdateInterpretationBandInput!) {
    updateInterpretationBand(input: $input) {
      success
      message
      band {
        id
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

export { UpdateInterpretationBandDoc };
