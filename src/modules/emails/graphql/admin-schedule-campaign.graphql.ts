import { graphql } from '@/gql';

export const AdminScheduleCampaignDoc = graphql(`
  mutation AdminScheduleCampaign($id: UUID!, $sendAt: Datetime) {
    adminScheduleCampaign(id: $id, sendAt: $sendAt) {
      id
      status
      scheduledAt
    }
  }
`);
