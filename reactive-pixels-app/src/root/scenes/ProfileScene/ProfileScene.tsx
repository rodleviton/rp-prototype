import {
  PixelsGrid,
  PixelsGridItem
} from "@modules/reactive-pixels-ui/structures/PixelsGrid";
import { PixelsPreview } from "@modules/reactive-pixels-ui/structures/PixelsPreview";
import { ProfileMasthead } from "@modules/reactive-pixels-ui/structures/ProfileMasthead";
import { IBaseTheme, withStyles } from "@modules/reactive-pixels-ui/theme";
import { PixelsComposer } from "@root/composers/PixelsComposer";
import { UserComposer } from "@root/composers/UserComposer";
import { css } from "emotion";
import * as React from "react";
import { match } from "react-router";
import { IPixelsModel } from "reactive-pixels-common/models/PixelsModel";
import ProfileSceneQuery, {
  IData,
  profileSceneQuery
} from "./ProfileSceneQuery";

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
  public addPixelsGridIteem = (item: IPixelsModel) => {
    return (
      <PixelsGridItem key={item.id}>
        <PixelsComposer
          loggedInUserId={""}
          pixels={item}
          render={pixelsData => (
            <PixelsPreview
              src={pixelsData.imageSrc}
              to={pixelsData.url}
              isLikedByLoggedInUser={pixelsData.isLikedByLoggedInUser}
              likes={pixelsData.likes}
              onUpdatePixelsLikesVariables={
                pixelsData.onUpdatePixelsLikesVariables
              }
            />
          )}
        />
      </PixelsGridItem>
    );
  };

  public render() {
    const { classes } = this.props;
    const { username } = this.props.match.params;

    const variables = {
      username
    };

    return (
      <ProfileSceneQuery query={profileSceneQuery} variables={variables}>
        {({ loading, error, data }) => {
          if (error) {
            return <p>Oops...</p>;
          }

          if (loading || !data) {
            // Our components now how to handle the loading states
            data = {} as IData;
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
                {data.user && data.user.pixels.map(this.addPixelsGridIteem)}
              </PixelsGrid>
            </React.Fragment>
          );
        }}
      </ProfileSceneQuery>
    );
  }
}

export default withStyles(styles)(ProfileScene);
