import { graphql } from "@/gql";

const SignupDoc = graphql(`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        ...Lite_User
      }
    }
  }
`);

export { SignupDoc };