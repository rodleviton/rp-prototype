import { IAuthState } from "@modules/auth/daos/authReducer";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { IUserExtendedModel } from "reactive-pixels-common/models/UserModel";

export interface IGetAuthUserProfileData {
  user: IUserExtendedModel;
}

export interface IGetAuthUserProfileProps {
  auth: IAuthState;
}

export const GET_PROFILE = gql`
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

const withAuthUserProfile = graphql<
  IGetAuthUserProfileProps,
  IGetAuthUserProfileData
>(GET_PROFILE, {
  options: ({ auth: { user } }) => {
    return {
      variables: {
        id: user.id
      }
    };
  }
});

export default withAuthUserProfile;
