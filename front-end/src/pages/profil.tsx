import { Activity, EmptyData, PageTitle } from "@/components";
import { graphqlClient } from "@/graphql/apollo";
import {
  ActivityFragment,
  GetFavoritesActivitiesByUserQuery,
  GetFavoritesActivitiesByUserQueryVariables,
} from "@/graphql/generated/types";
import GetFavoritesActivitiesByUser from "@/graphql/queries/activity/getFavoritesActivitiesByUser";
import { withAuth } from "@/hocs";
import { useAuth } from "@/hooks";
import { Avatar, Flex, Grid, NativeSelect, Text } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useMemo, useState } from "react";

interface ProfileProps {
  favoriteActivities: ActivityFragment[];
}

export const getServerSideProps: GetServerSideProps<ProfileProps> = async ({
  req,
}) => {
  const response = await graphqlClient.query<
    GetFavoritesActivitiesByUserQuery,
    GetFavoritesActivitiesByUserQueryVariables
  >({
    query: GetFavoritesActivitiesByUser,
    context: { headers: { Cookie: req.headers.cookie } },
  });

  return {
    props: {
      favoriteActivities: response.data.getFavoritesActivitiesByUser,
    },
  };
};

const Profile = (props: ProfileProps) => {
  const { user } = useAuth();
  const { favoriteActivities } = props;

  const [sortBy, setSortBy] = useState("id");

  const sortedActivities = useMemo(() => {
    const sorted = [...favoriteActivities];
    switch (sortBy) {
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "price":
        return sorted.sort((a, b) => a.price - b.price);
      default:
        return sorted.sort((a, b) => a.id.localeCompare(b.id));
    }
  }, [favoriteActivities, sortBy]);

  return (
    <>
      <Head>
        <title>Mon profil | CDTR</title>
      </Head>
      <PageTitle title='Mon profil' />
      <Flex align='center' gap='md'>
        <Avatar color='cyan' radius='xl' size='lg'>
          {user?.firstName[0]}
          {user?.lastName[0]}
        </Avatar>
        <Flex direction='column'>
          <Text>{user?.email}</Text>
          <Text>{user?.firstName}</Text>
          <Text>{user?.lastName}</Text>
        </Flex>
      </Flex>

      <PageTitle title='Mes activités favorites' />

      <NativeSelect
        mt='md'
        mb='md'
        label='Organiser par'
        data={[
          { label: "ID", value: "id" },
          { label: "Nom", value: "name" },
          { label: "Prix", value: "price" },
        ]}
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
      />

      <Grid>
        {sortedActivities.length > 0 ? (
          sortedActivities.map((activity) => (
            <Activity activity={activity} key={activity.id} />
          ))
        ) : (
          <EmptyData />
        )}
      </Grid>
    </>
  );
};

export default withAuth(Profile);
