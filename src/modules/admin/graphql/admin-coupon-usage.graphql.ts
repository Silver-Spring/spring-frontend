import { graphql } from '@/gql';

const AdminCouponUsageDoc = graphql(`
  query AdminCouponUsage($couponId: UUID!) {
    adminCouponUsage(couponId: $couponId) {
      usageRecords {
        id
        userName
        userEmail
        discountAmount
        usedAt
      }
      totalCount
    }
  }
`);

export { AdminCouponUsageDoc };
