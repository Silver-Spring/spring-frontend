
import { graphql } from '@/gql';

const ValidateCouponDoc = graphql(`
  mutation ValidateCoupon($input: ValidateCouponInput!) {
    validateCoupon(input: $input) {
      valid
      coupon {
        code
        description
        discountType
        discountValue
      }
      discountAmount
      originalAmount
      finalAmount
      message
    }
  }
`);

export { ValidateCouponDoc };
