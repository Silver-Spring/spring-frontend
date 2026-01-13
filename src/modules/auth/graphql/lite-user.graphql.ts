import { graphql } from "@/gql";

export const LiteUserDoc = graphql(`
fragment Lite_User on User {
  id
  name
  email
  age
  gender
  type
  isAdmin
}
`);
