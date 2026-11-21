import { graphql } from '@/gql';

export const AdminDuplicateCampaignDoc = graphql(`
  mutation AdminDuplicateCampaign($id: UUID!, $eventId: UUID) {
    adminDuplicateCampaign(id: $id, eventId: $eventId) {
      id
    }
  }
`);
