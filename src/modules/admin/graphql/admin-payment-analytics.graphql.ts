import { graphql } from '@/gql';

const AdminPaymentAnalyticsDoc = graphql(`
  query AdminPaymentAnalytics($input: AdminPaymentsFilterInput) {
    adminPaymentAnalytics(input: $input) {
      totalPayments
      totalAmount
      capturedPayments
      capturedAmount
      failedPayments
      failedAmount
      refundedPayments
      refundedAmount
      averagePaymentAmount
      successRate
      recentPayments
      paymentMethodBreakdown {
        method
        count
        totalAmount
        successCount
        failedCount
      }
    }
  }
`);

export { AdminPaymentAnalyticsDoc };
