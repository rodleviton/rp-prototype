import gql from "graphql-tag";
import { Query } from "react-apollo";
import { IUserModel } from "reactive-pixels-common/models/UserModel";

export interface IData {
  user: IUserModel;
}

interface IVariables {
  username: string;
}

export const getUserByUsername = gql`
  query Query($username: String!) {
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
  }
`;

export default class GetUserByUsernameQuery extends Query<IData, IVariables> {}
