import gql from "graphql-tag";
import { Query } from "react-apollo";
import { IPixelsModel } from "reactive-pixels-common/models/PixelsModel";

export interface IData {
  pixels: IPixelsModel;
}

interface IVariables {
  id: string;
}

export const GET_PIXELS = gql`
  query Query($id: ID!) {
    pixels: getPixels(id: $id) {
      id
      uid
      title
      owner
      repo
      likes
    }
  }
`;

export default class GetPixelsQuery extends Query<IData, IVariables> {}
