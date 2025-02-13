import gql from "graphql-tag";

const AddUserToFavorite = gql`
  mutation AddUserToFavorite($activityId: String!) {
    addUserToFavorite(activityId: $activityId) {
      id
    }
  }
`;

export default AddUserToFavorite;
