import { gql } from "apollo-server-express";
import getPixelsMetadata from "../../pixels/getPixelsById";

export const pixelsMetadataTypeDef = gql`
  type PixelsMetadata {
    description: String
    originalLanguage: String!
    topics: [String]!
  }
`;

export const pixelsMetadataResolver = {
  // Nested Pixels Resolvers
  Pixels: {
    metadata: pixels => {
      return getPixelsMetadata(pixels.owner, pixels.repo);
    }
  }
};
