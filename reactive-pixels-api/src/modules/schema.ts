import { gql } from "apollo-server-express";
import getPixelsById from "./pixels/getPixelsById";
import getPixelsByUsername from "./pixels/getPixelsByUsername";
import getPixelsComments from "./pixels/getPixelsComments";
import getPixelsMetadata from "./pixels/getPixelsMetadata";
import getUserByUsername from "./user/getUserByUsername";
import withAuth from "./common/helpers/withAuth";

export const typeDefs = gql`
  type Metadata {
    description: String
    originalLanguage: String!
    topics: [String]!
  }

  type Comment {
    id: ID!
    uid: String!
    displayName: String
    githubUserId: String!
    likes: [String]!
    text: String!
    timestamp: String!
  }

  type Pixels {
    id: ID!
    uid: String
    title: String!
    owner: String!
    repo: String!
    likes: [String]!
    metadata: Metadata!
    comments: [Comment]!
  }

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

  type Query {
    getPixels(id: ID!): Pixels!
    getUser(username: String!): User!
  }

  type LikePixelsResponse {
    pixelsId: String
  }

  type UserLikedPixelsResponse {
    pixelsId: String
  }

  type Mutation {
    addPixelsLike(pixelsId: ID!): LikePixelsResponse
    removePixelsLike(pixelsId: ID!): LikePixelsResponse
    addUserLikedPixels(pixelsId: ID!): UserLikedPixelsResponse
    removeUserLikedPixels(pixelsId: ID!): UserLikedPixelsResponse
  }
`;

export const resolvers = {
  Query: {
    getPixels: async (_, { id }, context) => {
      const { db } = context;

      // const decodedAuthToken = await withAuth(context.authorization);

      // console.log(decodedAuthToken);

      return getPixelsById(id, db);
    },
    getUser: (_, { username }, context) => {
      const { db } = context;

      return getUserByUsername(username, db);
    }
  },

  // Nested Pixels Resolvers
  Pixels: {
    comments: (pixels, _, context) => {
      const { db } = context;

      return getPixelsComments(pixels.id, db);
    },
    metadata: pixels => {
      return getPixelsMetadata(pixels.owner, pixels.repo);
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
    addPixelsLike: async (_, { pixelsId }, context) => {
      console.log("like pixels:", pixelsId);

      const decodedAuthToken = await withAuth(context.authorization);

      console.log(decodedAuthToken);

      // return {
      //   pixelsId
      // };
    },
    removePixelsLike: (_, { pixelsId }, context) => {
      console.log("unlike pixels:", pixelsId);

      return {
        pixelsId
      };
    },
    addUserLikedPixels: (_, { pixelsId }, context) => {
      console.log("user liked pixels:", pixelsId);

      return {
        pixelsId
      };
    },
    removeUserLikedPixels: (_, { pixelsId }, context) => {
      console.log("user unliked pixels:", pixelsId);

      return {
        pixelsId
      };
    }
  }
};
