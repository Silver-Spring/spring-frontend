import { graphql } from "@/gql";

const LogoutDoc = graphql(`
  mutation Logout {
    logout {
      success
    }
  }
`);

export { LogoutDoc };
