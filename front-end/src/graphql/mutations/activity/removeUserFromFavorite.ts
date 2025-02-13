import gql from "graphql-tag";

const RemoveUserFromFavorite = gql`
  mutation RemoveUserFromFavorite($activityId: String!) {
    removeUserFromFavorite(activityId: $activityId) {
      id
    }
  }
`;

export default RemoveUserFromFavorite;
