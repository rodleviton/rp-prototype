import { gql } from "apollo-server-express";
import getPixelsById from "../../pixels/getPixelsById";
import withAuth from "../helpers/withAuth";
import updatePixelsLikes from "../../pixels/updatePixelsLikes";

export const pixelsTypeDef = gql`
  type Pixels {
    id: ID!
    uid: String
    title: String!
    owner: String!
    repo: String!
    likes: [String]!
    metadata: PixelsMetadata!
    comments: [PixelsComment]!
  }
`;

export const pixelsResolver = {
  Query: {
    getPixels: async (_, { id }, context) => {
      const { db } = context;

      return getPixelsById(id, db);
    }
  },

  Mutation: {
    updatePixelsLikes: async (_, { id, method }, context) => {
      const { db } = context;
      const decodedAuthToken = await withAuth(context.authorization);

      const likes = await updatePixelsLikes(
        id,
        decodedAuthToken.uid,
        method,
        db
      );

      return {
        likes
      };
    }
  }
};
