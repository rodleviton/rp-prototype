import { gql } from "apollo-server-express";

export const mutationTypeDef = gql`
  type UpdatePixelsLikesResponse {
    likes: [String]!
  }

  type UpdateUserLikedPixelsResponse {
    likedPixels: [String]!
  }

  type Mutation {
    updatePixelsLikes(id: ID!, method: String!): UpdatePixelsLikesResponse
    updateUserLikedPixels(
      id: ID!
      method: String!
    ): UpdateUserLikedPixelsResponse
  }
`;
