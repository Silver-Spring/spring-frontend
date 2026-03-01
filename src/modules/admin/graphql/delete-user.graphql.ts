import { graphql } from '@/gql';

const DeleteUserDoc = graphql(`
  mutation DeleteUser($input: AdminDeleteUserInput!) {
    adminDeleteUser(input: $input) {
      deletedUserId
      success
      message
    }
  }
`);

export { DeleteUserDoc };
