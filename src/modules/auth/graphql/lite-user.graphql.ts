import { graphql } from "@/gql";

export const LiteUserDoc = graphql(`
fragment Lite_User on User {
  id
  name
  email
  age
  phoneNumber
  gender
  type
  isAdmin
}
`);
