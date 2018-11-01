import { IAuthState } from "@modules/auth/daos/authReducer";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { IUserModel } from "reactive-pixels-common/models/UserModel";

export interface IGetUserData {
  user: IUserModel;
}

export interface IGetUserProps {
  auth: IAuthState;
}

export const GET_USER = gql`
  query GetProfile($id: ID!) {
    user: getUserById(id: $id) {
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

const withUser = graphql<IGetUserProps, IGetUserData>(GET_USER, {
  options: ({ auth: { user } }) => {
    return {
      variables: {
        id: user.id
      }
    };
  }
});

export default withUser;
