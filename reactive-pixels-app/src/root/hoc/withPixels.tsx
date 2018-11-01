import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { IPixelsModel } from "reactive-pixels-common/models/PixelsModel";
import { IUserModel } from "reactive-pixels-common/models/UserModel";

export interface IGetPixelsData {
  pixels: IPixelsModel;
  user: IUserModel;
}

export interface IGetPixelsProps {
  pixelsId: string;
  username: string;
}

export const GET_PIXELS = gql`
  query Query($id: ID!, $username: String!) {
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

const withPixels = graphql<IGetPixelsProps, IGetPixelsData>(GET_PIXELS, {
  options: ({ pixelsId, username }) => {
    return {
      variables: {
        id: pixelsId,
        username
      }
    };
  }
});

export default withPixels;
