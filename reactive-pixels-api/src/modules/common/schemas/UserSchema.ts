import { gql } from "apollo-server-express";
import getUserByUsername from "../../user/getUserByUsername";
import getUserById from "../../user/getUserById";
import getPixelsByUsername from "../../pixels/getPixelsByUsername";
import withAuth from "../helpers/withAuth";
import updateUserLikedPixels from "../../user/updateUserLikedPixels";
import updateUserFollowing from "../../user/updateUserFollowing";
import updateUserFollowers from "../../user/updateUserFollowers";

export const userTypeDef = gql`
  type User {
    id: ID!
    githubUserId: String!
    displayName: String!
    location: String!
    email: String!
    username: String!
    followers: [String]!
    following: [String]!
    likedPixels: [String]!
    creationTime: String!
    lastSignInTime: String!
    isFirstLogin: Boolean!
    pixels: [Pixels]!
  }
`;

export const userResolver = {
  Query: {
    getUserByUsername: (_, { username }, context) => {
      const { db } = context;

      return getUserByUsername(username, db);
    },
    getUserById: (_, { id }, context) => {
      const { db } = context;

      return getUserById(id, db);
    }
  },

  // Nested User Resolvers
  User: {
    pixels: (user, _, context) => {
      const { db } = context;

      return getPixelsByUsername(user.username, db);
    }
  },

  Mutation: {
    updateUserLikedPixels: async (_, { id, method }, context) => {
      const { db } = context;
      const decodedAuthToken = await withAuth(context.authorization);

      const likedPixels = await updateUserLikedPixels(
        id,
        decodedAuthToken.uid,
        method,
        db
      );

      return {
        likedPixels
      };
    },

    updateUserFollowing: async (_, { userId, method }, context) => {
      const { db } = context;
      const decodedAuthToken = await withAuth(context.authorization);

      const following = await updateUserFollowing(
        userId,
        decodedAuthToken.uid,
        method,
        db
      );

      return {
        following
      };
    },

    updateUserFollowers: async (_, { userId, method }, context) => {
      const { db } = context;
      const decodedAuthToken = await withAuth(context.authorization);

      const followers = await updateUserFollowers(
        userId,
        decodedAuthToken.uid,
        method,
        db
      );

      return {
        followers
      };
    }
  }
};
