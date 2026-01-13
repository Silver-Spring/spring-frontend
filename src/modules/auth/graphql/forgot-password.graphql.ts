import { graphql } from '@/gql';

const ForgotPasswordDoc = graphql(`
  mutation forgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      success
    }
  }
`);

export { ForgotPasswordDoc };
