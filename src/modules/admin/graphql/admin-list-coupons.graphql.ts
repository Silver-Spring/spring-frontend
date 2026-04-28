import { graphql } from '@/gql';

const AdminListCouponsDoc = graphql(`
  query AdminListCoupons {
    adminListCoupons {
      coupons {
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
      totalCount
    }
  }
`);

export { AdminListCouponsDoc };
