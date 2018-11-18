import { IAuthState } from "@modules/auth/daos/authReducer";
import {
  addItemToArray,
  removeItemFromArray
} from "@modules/utils/arrayUtilities";
import client from "@root/daos/client";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

export type UpdateUserFollowMethod = "add" | "remove";

export interface IUserFollowInputProps {
  auth: IAuthState;
  userId: string;
  method: UpdateUserFollowMethod;
}

export interface IUserFollowVariables {
  userId: string;
  method: UpdateUserFollowMethod;
}

export const UPDATE_USER_FOLLOW = gql`
  mutation UpdateUserFollowMutation($userId: ID!, $method: String!) {
    updateUserFollowers(userId: $userId, method: $method) {
      followers
    }
    updateUserFollowing(userId: $userId, method: $method) {
      following
    }
  }
`;

// TODO - Share these
const UserFragment = gql`
  fragment user on User {
    id
    email
    githubUserId
    displayName
    following
    followers
    likedPixels
    username
    location
    isFirstLogin
  }
`;

const updateFollows = (
  collection: string[],
  item: string,
  method: UpdateUserFollowMethod
): string[] => {
  if (method === "add") {
    return !collection.includes(item)
      ? addItemToArray(collection, item)
      : collection;
  }

  return collection.includes(item)
    ? removeItemFromArray(collection, item)
    : collection;
};

const withUserFollowHandler = graphql<
  IUserFollowInputProps,
  any,
  IUserFollowVariables,
  any
>(UPDATE_USER_FOLLOW, {
  options: ({ userId, method }) => {
    return {
      variables: {
        method,
        userId
      }
    };
  },
  props: ({ mutate }) => {
    return {
      onUserFollow: ({ auth, userId, method }: IUserFollowInputProps) => {
        return (
          mutate &&
          mutate({
            /**
             * Optimistically update the UI to reflect the users action
             */
            optimisticResponse: {
              updateUserFollowers: {
                __typename: "UpdateUserFollowersResponse",
                followers: (() => {
                  const profileUser: any = client.cache.readFragment({
                    fragment: UserFragment,
                    id: `User:${userId}`
                  });

                  return updateFollows(profileUser.followers, userId, method);
                })()
              },
              updateUserFollowing: {
                __typename: "UpdateUserFollowingResponse",
                following: (() => {
                  const authUser: any = client.cache.readFragment({
                    fragment: UserFragment,
                    id: `User:${auth.user.id}`
                  });

                  return updateFollows(authUser.following, userId, method);
                })()
              }
            },
            /**
             * Manually update our graphql store cache
             */
            update: (
              cache,
              { data: { updateUserFollowers, updateUserFollowing } }
            ) => {
              const authUser = cache.readFragment({
                fragment: UserFragment,
                id: `User:${auth.user.id}`
              });

              // TODO - Always fetch auth user profile
              if (authUser) {
                cache.writeFragment({
                  data: {
                    ...authUser,
                    following: updateUserFollowing.following
                  },
                  fragment: UserFragment,
                  id: `User:${auth.user.id}`
                });
              }

              const profileUser = cache.readFragment({
                fragment: UserFragment,
                id: `User:${userId}`
              });

              cache.writeFragment({
                data: {
                  ...profileUser,
                  followers: updateUserFollowers.followers
                },
                fragment: UserFragment,
                id: `User:${userId}`
              });
            },
            variables: { userId, method }
          })
        );
      }
    };
  }
});

export default withUserFollowHandler;
