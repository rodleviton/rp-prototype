import gql from "graphql-tag";
import { Query } from "react-apollo";
import { IPixelsModel } from "reactive-pixels-common/models/PixelsModel";
import { IUserModel } from "reactive-pixels-common/models/UserModel";

interface IUserExtended extends IUserModel {
  pixels: IPixelsModel[];
}

export interface IData {
  user: IUserExtended;
}

interface IVariables {
  username: string;
}

export const profileSceneQuery = gql`
  query Query($username: String!) {
    user: getUser(username: $username) {
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
      pixels {
        id
        uid
        title
        owner
        repo
        likes
      }
    }
  }
`;

export default class ProfileSceneQuery extends Query<IData, IVariables> {}
