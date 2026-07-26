import { graphql } from '@/gql';

const AdminWorkbookStatsDoc = graphql(`
  query AdminWorkbookStats {
    adminWorkbookStats {
      totalPurchases
      totalRevenue
      recentPurchases
      pendingPurchases
      failedPurchases
      couponPurchases
      freePurchases
      uniqueBuyers
      averageOrderValue
      totalDiscountGiven
      last7DaysPurchases
      last7DaysRevenue
    }
  }
`);

export { AdminWorkbookStatsDoc };
