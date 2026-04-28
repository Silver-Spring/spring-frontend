import { graphql } from '@/gql';

const AdminUpdateCouponDoc = graphql(`
  mutation AdminUpdateCoupon($input: UpdateCouponInput!) {
    adminUpdateCoupon(input: $input) {
      success
      message
      coupon {
        id
        code
        description
        discountType
        discountValue
        maxDiscountAmount
        validFrom
        validUntil
        isActive
        maxTotalUses
        currentUses
        updatedAt
      }
    }
  }
`);

export { AdminUpdateCouponDoc };
