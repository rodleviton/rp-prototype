import { gql } from "apollo-server-express";
import getPixelsComments from "../../pixels/getPixelsById";

export const pixelsCommentTypeDef = gql`
  type PixelsComment {
    id: ID!
    uid: String!
    displayName: String
    githubUserId: String!
    likes: [String]!
    text: String!
    timestamp: String!
  }
`;

export const pixelsCommentResolver = {
  // Nested Pixels Resolvers
  Pixels: {
    comments: (pixels, _, context) => {
      const { db } = context;

      return getPixelsComments(pixels.id, db);
    }
  }
};
