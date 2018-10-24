import { Box } from "@modules/ui/components/Box";
import { PixelsSandbox } from "@modules/ui/structures/PixelsSandbox";
import { ProfileSticker } from "@modules/ui/structures/ProfileSticker";
import { IBaseTheme, withStyles } from "@modules/ui/theme";
import { PixelsComposer } from "@root/composers/PixelsComposer";
import { UserComposer } from "@root/composers/UserComposer";
import { css } from "emotion";
import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";

interface IClasses {
  sticker: string;
}

interface IProps {
  authUserId?: string;
  classes: IClasses;
  pixelsId: string;
  username: string;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { spacers } = theme.sizes;

  return {
    sticker: css({
      marginBottom: spacers.medium
    })
  };
};

class PixelsHero extends React.PureComponent<IProps> {
  public render() {
    const { authUserId, classes, pixelsId, username } = this.props;

    const variables = {
      id: pixelsId,
      username
    };

    const query = gql`
      query Query($id: ID!, $username: String!) {
        pixels: getPixels(id: $id) {
          id
          uid
          title
          owner
          repo
          likes
        }
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
        }
      }
    `;

    return (
      <Query query={query} variables={variables}>
        {({ error, data }) => {
          if (error) {
            console.error(error);

            return <p>Oops...</p>;
          }

          return (
            <Box>
              <UserComposer
                user={data.user}
                render={userData => (
                  <ProfileSticker
                    align="left"
                    className={classes.sticker}
                    subheading="Created by"
                    avatar={userData.avatarUrl}
                    name={userData.displayName}
                    url={userData.url}
                  />
                )}
              />

              <PixelsComposer
                loggedInUserId={authUserId}
                pixels={data.pixels}
                render={pixelsData => {
                  return (
                    <PixelsSandbox
                      src={pixelsData.iframeSrc}
                      isLikedByLoggedInUser={pixelsData.isLikedByLoggedInUser}
                      onPixelsLike={pixelsData.onPixelsLike}
                      numberOfLikes={pixelsData.numberOfLikes}
                    />
                  );
                }}
              />
            </Box>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(PixelsHero);
