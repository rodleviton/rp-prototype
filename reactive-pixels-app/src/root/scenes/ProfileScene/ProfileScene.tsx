import { PixelsGrid, PixelsGridItem } from "@modules/ui/structures/PixelsGrid";
import { PixelsPreview } from "@modules/ui/structures/PixelsPreview";
import { ProfileMasthead } from "@modules/ui/structures/ProfileMasthead";
import { IBaseTheme, withStyles } from "@modules/ui/theme";
import { PixelsComposer } from "@root/composers/PixelsComposer";
import { UserComposer } from "@root/composers/UserComposer";
import { css } from "emotion";
import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import { match } from "react-router";
import { IPixelsModel } from "reactive-pixels-common/models/PixelsModel";
import { compose } from "recompose";

interface IClasses {
  grid: string;
}

interface IProps {
  classes: IClasses;
  match: match<{ username: string }>;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { spacers } = theme.sizes;

  return {
    grid: css({
      paddingBottom: spacers.large,
      paddingTop: spacers.large
    })
  };
};

class ProfileScene extends React.PureComponent<IProps> {
  public render() {
    const { classes } = this.props;
    const { username } = this.props.match.params;

    const variables = {
      username
    };

    const query = gql`
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

    return (
      <Query query={query} variables={variables}>
        {({ loading, error, data }) => {
          if (error) {
            console.error(error);

            return <p>Oops...</p>;
          }

          return (
            <React.Fragment>
              <UserComposer
                user={data.user}
                render={userData => (
                  <ProfileMasthead
                    avatarUrl={userData.avatarUrl}
                    displayName={userData.displayName}
                    location={userData.location}
                  />
                )}
              />
              <PixelsGrid className={classes.grid}>
                {!loading &&
                  data.user.pixels.map((item: IPixelsModel, index: number) => (
                    <PixelsGridItem key={item.id || index}>
                      <PixelsComposer
                        loggedInUserId={""}
                        pixels={item}
                        render={pixelsData => (
                          <PixelsPreview
                            src={pixelsData.imageSrc}
                            to={pixelsData.url}
                            isLikedByLoggedInUser={
                              pixelsData.isLikedByLoggedInUser
                            }
                            numberOfLikes={pixelsData.numberOfLikes}
                            onPixelsLike={pixelsData.onPixelsLike}
                          />
                        )}
                      />
                    </PixelsGridItem>
                  ))}
              </PixelsGrid>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default compose(withStyles(styles))(ProfileScene);
