import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { IUserExtendedModel } from "reactive-pixels-common/models/UserModel";

export interface IGetProfileData {
  user: IUserExtendedModel;
}

export interface IGetProfileProps {
  username: string;
}

export const GET_PROFILE = gql`
  query GetProfile($username: String!) {
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

const withProfile = graphql<IGetProfileProps, IGetProfileData>(GET_PROFILE, {
  options: ({ username }) => {
    return {
      variables: {
        username
      }
    };
  }
});

export default withProfile;
