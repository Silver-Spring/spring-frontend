import { graphql } from '@/gql';

const CreateRecommendedActionDoc = graphql(`
  mutation CreateRecommendedAction($input: CreateRecommendedActionInput!) {
    createRecommendedAction(input: $input) {
      success
      message
      action {
        id
        actionText
        priority
        isActive
      }
    }
  }
`);

const UpdateRecommendedActionDoc = graphql(`
  mutation UpdateRecommendedAction($input: UpdateRecommendedActionInput!) {
    updateRecommendedAction(input: $input) {
      success
      message
      action {
        id
        actionText
        priority
        isActive
      }
    }
  }
`);

const DeleteRecommendedActionDoc = graphql(`
  mutation DeleteRecommendedAction($input: DeleteRecommendedActionInput!) {
    deleteRecommendedAction(input: $input) {
      success
      message
    }
  }
`);

export { CreateRecommendedActionDoc, UpdateRecommendedActionDoc, DeleteRecommendedActionDoc };
