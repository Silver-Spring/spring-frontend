import { graphql } from '@/gql';

export const AdminCancelCampaignDoc = graphql(`
  mutation AdminCancelCampaign($id: UUID!) {
    adminCancelCampaign(id: $id) {
      id
      status
    }
  }
`);
