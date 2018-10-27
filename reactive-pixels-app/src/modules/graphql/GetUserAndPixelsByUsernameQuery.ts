import gql from "graphql-tag";
import { Query } from "react-apollo";
import { IPixelsModel } from "reactive-pixels-common/models/PixelsModel";
import { IUserModel } from "reactive-pixels-common/models/UserModel";

export interface IData {
  pixels: IPixelsModel;
  user: IUserModel;
}

export interface IVariables {
  id: string;
  username: string;
}

export const GET_USER_AND_PIXELS_BY_USERNAME = gql`
  query GetUserAndPixelsByUsername($id: ID!, $username: String!) {
    user: getUserByUsername(username: $username) {
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

export default class GetUserAndPixelsByUsernameQuery extends Query<
  IData,
  IVariables
> {}
