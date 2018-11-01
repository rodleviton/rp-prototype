import { IAuthState } from "@modules/auth/daos/authReducer";
import {
  addItemToArray,
  removeItemFromArray
} from "@modules/utils/arrayUtilities";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

export type UpdatePixelsLikesMethod = "add" | "remove";

export interface IPixelsLikeData {
  likes: string[];
  likedPixels: string[];
}

export interface IPixelsLikeInputProps {
  auth: IAuthState;
  id: string;
  method: UpdatePixelsLikesMethod;
  likes: string[];
  userLikedPixels: string[];
}

export interface IPixelsLikeVariables {
  id: string;
  method: UpdatePixelsLikesMethod;
}

export const UPDATE_PIXELS_LIKES = gql`
  mutation UpdatePixelsLikeMutation($id: ID!, $method: String!) {
    updatePixelsLikes(id: $id, method: $method) {
      likes
    }
    updateUserLikedPixels(id: $id, method: $method) {
      likedPixels
    }
  }
`;

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

const PixelsFragment = gql`
  fragment pixels on Pixels {
    id
    uid
    title
    owner
    repo
    likes
  }
`;

const updateLikes = (
  arrayOfLikes: string[],
  item: string,
  method: UpdatePixelsLikesMethod
) => {
  return method === "add"
    ? addItemToArray(arrayOfLikes, item)
    : removeItemFromArray(arrayOfLikes, item);
};

const withPixelsLikeHandler = graphql<
  IPixelsLikeInputProps,
  any,
  IPixelsLikeVariables,
  any
>(UPDATE_PIXELS_LIKES, {
  options: ({ id, method }) => {
    return {
      variables: {
        id,
        method
      }
    };
  },
  props: ({ mutate }) => {
    return {
      onPixelsLike: ({
        auth,
        id,
        likes,
        method,
        userLikedPixels
      }: IPixelsLikeInputProps) => {
        return (
          auth.user.id &&
          mutate &&
          mutate({
            /**
             * Optimistically update the UI to reflect the users action
             */
            optimisticResponse: {
              updatePixelsLikes: {
                __typename: "UpdatePixelsLikesResponse",
                likes: updateLikes(likes, auth.user.id, method)
              },
              updateUserLikedPixels: {
                __typename: "UpdateUserLikedPixelsResponse",
                likedPixels: updateLikes(userLikedPixels, id, method)
              }
            },
            /**
             * Manually update our graphql store cache
             */
            update: (
              cache,
              { data: { updatePixelsLikes, updateUserLikedPixels } }
            ) => {
              const pixels = cache.readFragment({
                fragment: PixelsFragment,
                id: `Pixels:${id}`
              });

              cache.writeFragment({
                data: {
                  ...pixels,
                  likes: updatePixelsLikes.likes
                },
                fragment: PixelsFragment,
                id: `Pixels:${id}`
              });

              const user = cache.readFragment({
                fragment: UserFragment,
                id: `User:${auth.user.id}`
              });

              cache.writeFragment({
                data: {
                  ...user,
                  likedPixels: updateUserLikedPixels.likedPixels
                },
                fragment: UserFragment,
                id: `User:${auth.user.id}`
              });
            },
            variables: { id, method }
          })
        );
      }
    };
  }
});

export default withPixelsLikeHandler;
