import { IAuthState } from "@modules/auth/daos/authReducer";
import { Box } from "@modules/reactive-pixels-ui/components/Box";
import { PixelsSandbox } from "@modules/reactive-pixels-ui/structures/PixelsSandbox";
import { PixelsWrapper } from "@modules/reactive-pixels-ui/structures/PixelsWrapper";
import { ProfileSticker } from "@modules/reactive-pixels-ui/structures/ProfileSticker";
import { IBaseTheme, withStyles } from "@modules/reactive-pixels-ui/theme";
import { PixelsComposer } from "@root/composers/PixelsComposer";
import { UserComposer } from "@root/composers/UserComposer";
import { PixelsLikeButton } from "@root/containers/PixelsLikeButton";
import withAuth from "@root/hoc/withAuth";
import withPixels, {
  IGetPixelsData,
  IGetPixelsProps
} from "@root/hoc/withPixels";
import { css } from "emotion";
import * as React from "react";
import { ChildProps, compose } from "react-apollo";
import { IPixelsModel } from "reactive-pixels-common/models/PixelsModel";
import { IUserModel } from "reactive-pixels-common/models/UserModel";

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
  const { palette } = theme.colours;
  const { spacers } = theme.sizes;

  return {
    sticker: css({
      border: "1px solid transparent",
      marginBottom: spacers.medium,
      transition: "background 0.25s",
      ["&:focus, &:hover"]: {
        background: "#fff",
        border: `1px solid ${palette.grey5.hex}`,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 3,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 3,
        outline: 0
      },
      [`&:active`]: {
        boxShadow: `inset 0px 0px 4px 0px ${palette.grey5.hex}`
      }
    })
  };
};

class PixelsHero extends React.PureComponent<
  ChildProps<IGetPixelsProps & IProps, IGetPixelsData>
> {
  public render() {
    const { auth, classes, data } = this.props;

    // We cast empty data to expected type and let
    // component look after pending state
    let user = {} as IUserModel;
    let pixels = {} as IPixelsModel;

    if (data && data.user && data.pixels) {
      user = data.user;
      pixels = data.pixels;
    }

    return (
      <Box>
        <UserComposer
          user={user}
          render={userData => (
            <React.Fragment>
              <ProfileSticker
                align="left"
                className={classes.sticker}
                subheading="Created by"
                avatar={userData.avatarUrl}
                name={userData.displayName}
                url={userData.url}
              />

              <PixelsComposer
                loggedInUserId={auth.user.id}
                pixels={pixels}
                render={pixelsData => {
                  return (
                    <PixelsWrapper>
                      <PixelsSandbox src={pixelsData.iframeSrc} />
                      <PixelsLikeButton
                        isLikedByLoggedInUser={pixelsData.isLikedByLoggedInUser}
                        onUpdatePixelsLikesVariables={
                          pixelsData.onUpdatePixelsLikesVariables
                        }
                        likes={pixelsData.likes}
                        userLikedPixels={userData.likedPixels}
                      />
                    </PixelsWrapper>
                  );
                }}
              />
            </React.Fragment>
          )}
        />
      </Box>
    );
  }
}

export default compose(
  withAuth,
  withPixels,
  withStyles(styles)
)(PixelsHero);
