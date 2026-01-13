import { graphql } from '@/gql';

const ResetPasswordDoc = graphql(`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
    }
  }
`);

export { ResetPasswordDoc };
