import { graphql } from '@/gql';

const GrantAdminDoc = graphql(`
  mutation GrantAdmin($userId: UUID!) {
    grantAdminAccess(input: { userId: $userId }) {
      user {
        id
        email
        name
        isAdmin
        createdAt
        updatedAt
      }
      success
      message
    }
  }
`);

export { GrantAdminDoc };
