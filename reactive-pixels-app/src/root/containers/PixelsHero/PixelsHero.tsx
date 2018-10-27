import { IAuthState } from "@modules/auth/daos/authReducer";
import GetUserAndPixelsByUsernameQuery, {
  GET_USER_AND_PIXELS_BY_USERNAME,
  IData
} from "@modules/graphql/GetUserAndPixelsByUsernameQuery";
import { Box } from "@modules/reactive-pixels-ui/components/Box";
import { PixelsSandbox } from "@modules/reactive-pixels-ui/structures/PixelsSandbox";
import { ProfileSticker } from "@modules/reactive-pixels-ui/structures/ProfileSticker";
import { IBaseTheme, withStyles } from "@modules/reactive-pixels-ui/theme";
import { PixelsComposer } from "@root/composers/PixelsComposer";
import { UserComposer } from "@root/composers/UserComposer";
import { IRootState } from "@root/daos/rootReducer";
import { css } from "emotion";
import * as React from "react";
import { connect } from "react-redux";

interface IClasses {
  sticker: string;
}

interface IProps {
  auth: IAuthState;
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
    const { auth, classes, pixelsId, username } = this.props;

    return (
      <GetUserAndPixelsByUsernameQuery
        query={GET_USER_AND_PIXELS_BY_USERNAME}
        variables={{
          id: pixelsId,
          username
        }}
      >
        {({ loading, error, data }) => {
          if (error) {
            return <p>Oops...</p>;
          }

          if (loading || !data) {
            // Our components know how to handle an empty data set
            data = {} as IData;
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
                loggedInUserId={auth.user.id}
                pixels={data.pixels}
                render={pixelsData => {
                  return (
                    <PixelsSandbox
                      src={pixelsData.iframeSrc}
                      isLikedByLoggedInUser={pixelsData.isLikedByLoggedInUser}
                      onUpdatePixelsLikesVariables={
                        pixelsData.onUpdatePixelsLikesVariables
                      }
                      likes={pixelsData.likes}
                    />
                  );
                }}
              />
            </Box>
          );
        }}
      </GetUserAndPixelsByUsernameQuery>
    );
  }
}

const mapStateToProp = (state: IRootState) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProp)(withStyles(styles)(PixelsHero));
