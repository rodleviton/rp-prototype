import gql from "graphql-tag";
import { Mutation } from "react-apollo";

export type UpdatePixelsLikesMethod = "add" | "remove";

export interface IData {
  likes: string[];
}

export interface IVariables {
  id: string;
  method: UpdatePixelsLikesMethod;
}

export const UPDATE_PIXELS_LIKES = gql`
  mutation UpdatePixelsLikeMutation($id: ID!, $method: String!) {
    updatePixelsLikes(id: $id, method: $method) {
      likes
    }
  }
`;

export default class UpdatePixelsLikesMutation extends Mutation<
  any, // TODO - FIX
  IVariables
> {}
