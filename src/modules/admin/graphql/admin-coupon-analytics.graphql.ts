import { graphql } from '@/gql';

const AdminCouponAnalyticsDoc = graphql(`
  query AdminCouponAnalytics {
    adminCouponAnalytics {
      totalCoupons
      activeCoupons
      totalRedemptions
      totalDiscountGiven
    }
  }
`);

export { AdminCouponAnalyticsDoc };
