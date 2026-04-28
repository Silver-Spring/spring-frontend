import { graphql } from '@/gql';

const AdminActivateCouponDoc = graphql(`
  mutation AdminActivateCoupon($input: ActivateCouponInput!) {
    adminActivateCoupon(input: $input) {
      success
      message
    }
  }
`);

export { AdminActivateCouponDoc };
