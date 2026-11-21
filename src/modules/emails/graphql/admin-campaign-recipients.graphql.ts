import { graphql } from '@/gql';

export const AdminCampaignRecipientsDoc = graphql(`
  query AdminCampaignRecipients($id: UUID!, $status: String, $offset: Int, $limit: Int) {
    adminCampaignRecipients(id: $id, status: $status, offset: $offset, limit: $limit) {
      email
      name
      status
      error
      sentAt
    }
  }
`);
