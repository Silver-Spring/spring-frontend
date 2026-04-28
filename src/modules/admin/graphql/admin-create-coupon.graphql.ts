import { graphql } from '@/gql';

const AdminCreateCouponDoc = graphql(`
  mutation AdminCreateCoupon($input: CreateCouponInput!) {
    adminCreateCoupon(input: $input) {
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
        createdAt
        updatedAt
      }
    }
  }
`);

export { AdminCreateCouponDoc };
