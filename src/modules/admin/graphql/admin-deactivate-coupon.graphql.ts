import { graphql } from '@/gql';

const AdminDeactivateCouponDoc = graphql(`
  mutation AdminDeactivateCoupon($input: DeactivateCouponInput!) {
    adminDeactivateCoupon(input: $input) {
      success
      message
    }
  }
`);

export { AdminDeactivateCouponDoc };
