import { graphql } from '@/gql';

export const AdminCreateWorkshopEventDoc = graphql(`
  mutation AdminCreateWorkshopEvent($input: WorkshopEventInput!) {
    adminCreateWorkshopEvent(input: $input) {
      ...AdminWorkshopEventFields
    }
  }
`);

export const AdminUpdateWorkshopEventDoc = graphql(`
  mutation AdminUpdateWorkshopEvent($id: UUID!, $input: WorkshopEventInput!) {
    adminUpdateWorkshopEvent(id: $id, input: $input) {
      ...AdminWorkshopEventFields
    }
  }
`);

export const AdminSetWorkshopEventStatusDoc = graphql(`
  mutation AdminSetWorkshopEventStatus($id: UUID!, $status: String!) {
    adminSetWorkshopEventStatus(id: $id, status: $status) {
      ...AdminWorkshopEventFields
    }
  }
`);

export const AdminDeleteWorkshopEventDoc = graphql(`
  mutation AdminDeleteWorkshopEvent($id: UUID!) {
    adminDeleteWorkshopEvent(id: $id)
  }
`);
