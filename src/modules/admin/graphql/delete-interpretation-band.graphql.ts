import { graphql } from '@/gql';

const DeleteInterpretationBandDoc = graphql(`
  mutation DeleteInterpretationBand($input: DeleteInterpretationBandInput!) {
    deleteInterpretationBand(input: $input) {
      success
      message
    }
  }
`);

export { DeleteInterpretationBandDoc };
