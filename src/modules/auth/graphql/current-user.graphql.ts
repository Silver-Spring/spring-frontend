import { graphql } from "@/gql";

const CurrentUserDoc = graphql(`
  query CurrentUser {
    currentUser {
      id
      ...Lite_User
    }
  }
`);

export { CurrentUserDoc };