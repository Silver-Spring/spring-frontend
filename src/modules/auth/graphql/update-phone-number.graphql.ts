import { graphql } from "@/gql";

const UpdatePhoneNumberDoc = graphql(`
  mutation UpdatePhoneNumber($userId: UUID!, $phoneNumber: String!) {
    updateUser(input: { id: $userId, patch: { phoneNumber: $phoneNumber } }) {
      user {
        id
        ...Lite_User
      }
    }
  }
`);

export { UpdatePhoneNumberDoc };
