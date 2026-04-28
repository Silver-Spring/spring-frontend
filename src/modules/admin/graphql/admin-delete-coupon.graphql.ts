import { gql, TypedDocumentNode } from '@apollo/client';
import type {
  AdminDeleteCouponMutation,
  AdminDeleteCouponMutationVariables,
} from '@/gql/graphql';

export const AdminDeleteCouponDoc: TypedDocumentNode<
  AdminDeleteCouponMutation,
  AdminDeleteCouponMutationVariables
> = gql`
  mutation AdminDeleteCoupon($input: DeleteCouponInput!) {
    adminDeleteCoupon(input: $input) {
      success
      message
      deletedId
    }
  }
`;
