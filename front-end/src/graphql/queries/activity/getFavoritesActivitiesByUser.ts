import ActivityFragment from "@/graphql/fragments/activity";
import gql from "graphql-tag";

const GetFavoritesActivitiesByUser = gql`
  query GetFavoritesActivitiesByUser {
    getFavoritesActivitiesByUser {
      ...Activity
    }
  }
  ${ActivityFragment}
`;

export default GetFavoritesActivitiesByUser;
