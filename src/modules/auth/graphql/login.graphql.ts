import { graphql } from "@/gql";

const LoginDoc = graphql(`
mutation login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      ...Lite_User
    }
  }
}
`);

export { LoginDoc };