import { graphql } from '@/gql';

const AdminCouponByIdDoc = graphql(`
  query AdminCouponById($id: UUID!) {
    adminCouponById(id: $id) {
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
      createdBy
      createdAt
      updatedAt
    }
  }
`);

export { AdminCouponByIdDoc };
