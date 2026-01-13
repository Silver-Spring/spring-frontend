import { graphql } from '@/gql';

const ResendReportDoc = graphql(`
  mutation ResendReport($resultId: UUID!) {
    resendAssessmentReport(input: { resultId: $resultId }) {
      success
      message
    }
  }
`);

export { ResendReportDoc };
