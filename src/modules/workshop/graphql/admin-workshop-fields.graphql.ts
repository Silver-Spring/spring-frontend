import { graphql } from '@/gql';

export const AdminWorkshopEventFragment = graphql(`
  fragment AdminWorkshopEventFields on AdminWorkshopEvent {
    joiningUrl
    feedbackFormUrl
    resourcesNote
    registrationCount
    event {
      id
      slug
      title
      subtitle
      description
      programme
      takeaways
      speakers {
        name
        role
        photoUrl
      }
      bannerImageUrl
      startsAt
      endsAt
      formatLabel
      capacity
      status
      registrationOpen
      spotsLeft
    }
  }
`);
