import { gql } from "apollo-server-express";

export const queryTypeDef = gql`
  type Query {
    getPixels(id: ID!): Pixels!
    getUserByUsername(username: String!): User!
    getUserById(id: ID!): User!
  }
`;
