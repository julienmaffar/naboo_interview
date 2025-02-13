import {
  ActivityFragment,
  AddUserToFavoriteMutation,
  AddUserToFavoriteMutationVariables,
  GetFavoritesActivitiesByUserQuery,
  RemoveUserFromFavoriteMutation,
  RemoveUserFromFavoriteMutationVariables,
} from "@/graphql/generated/types";
import AddUserToFavorite from "@/graphql/mutations/activity/addUserToFavorite";
import RemoveUserFromFavorite from "@/graphql/mutations/activity/removeUserFromFavorite";
import { useAuth } from "@/hooks";
import { useDate } from "@/hooks/useDate";
import { useGlobalStyles } from "@/utils";
import { useMutation } from "@apollo/client";
import { Badge, Button, Card, Grid, Group, Image, Text } from "@mantine/core";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface ActivityProps {
  activity: ActivityFragment;
}

export function Activity({ activity }: ActivityProps) {
  const { classes } = useGlobalStyles();
  const { user } = useAuth();
  const { formatDate } = useDate();

  const [isFavorite, setIsFavorite] = useState(false);

  const [addUserToFavorite] = useMutation<
    AddUserToFavoriteMutation,
    AddUserToFavoriteMutationVariables
  >(AddUserToFavorite);

  const [removeUserFromFavorite] = useMutation<
    RemoveUserFromFavoriteMutation,
    RemoveUserFromFavoriteMutationVariables
  >(RemoveUserFromFavorite);

  const handleFavorite = useCallback(async () => {
    if (isFavorite)
      await removeUserFromFavorite({
        variables: {
          activityId: activity.id,
        },
      });
    else
      await addUserToFavorite({
        variables: {
          activityId: activity.id,
        },
      });

    setIsFavorite(!isFavorite);
  }, [activity.id, addUserToFavorite, isFavorite, removeUserFromFavorite]);

  useEffect(() => {
    setIsFavorite(!!activity.favorites?.find((_user) => _user.id === user?.id));
  }, [activity.favorites, user?.id]);

  return (
    <Grid.Col span={4}>
      <Card shadow='sm' padding='lg' radius='md' withBorder>
        <Card.Section>
          <Image
            src='https://dummyimage.com/480x4:3'
            height={160}
            alt='random image of city'
          />
        </Card.Section>

        <Group position='apart' mt='md' mb='xs'>
          <Text weight={500} className={classes.ellipsis}>
            {activity.name}
          </Text>
        </Group>

        <Group mt='md' mb='xs'>
          <Badge color='pink' variant='light'>
            {activity.city}
          </Badge>
          <Badge color='yellow' variant='light'>
            {`${activity.price}€/j`}
          </Badge>
        </Group>

        <Text size='sm' color='dimmed' className={classes.ellipsis}>
          {activity.description}
        </Text>

        {user?.role === "admin" && (
          <Text size='sm' color='dimmed'>
            Créé le {formatDate(activity.createdAt)}
          </Text>
        )}

        <Link href={`/activities/${activity.id}`} className={classes.link}>
          <Button variant='light' color='blue' fullWidth mt='md' radius='md'>
            Voir plus
          </Button>
        </Link>
        {user !== null && (
          <Button
            onClick={handleFavorite}
            variant='light'
            color={isFavorite ? "orange" : "blue"}
            fullWidth
            mt='md'
            radius='md'>
            {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          </Button>
        )}
      </Card>
    </Grid.Col>
  );
}
