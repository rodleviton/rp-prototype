import { IAuthState } from "@modules/auth/daos/authReducer";
import { ProfileSticker } from "@modules/reactive-pixels-ui/structures/ProfileSticker";
import { IBaseTheme, withStyles } from "@modules/reactive-pixels-ui/theme";
import { ResponsiveConsumer } from "@modules/reactive-pixels-ui/theme/ResponsiveProvider";
import { UserComposer } from "@root/composers/UserComposer";
import withAuth from "@root/hoc/withAuth";
import { css } from "emotion";
import * as React from "react";
import { ChildProps, compose } from "react-apollo";
import { IUserModel } from "reactive-pixels-common/models/UserModel";
import withUser, { IGetUserData, IGetUserProps } from "./withUser";

interface IClasses {
  sticker: string;
}

interface IProps {
  auth: IAuthState;
  classes: IClasses;
  theme: IBaseTheme;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { breakpoints } = theme;
  const { spacers } = theme.sizes;

  return {
    sticker: css({
      height: "100%",
      paddingLeft: spacers.medium * 1.5, // 15
      paddingRight: spacers.medium * 1.5,
      [`@media (min-width: ${breakpoints.medium}px)`]: {
        paddingLeft: spacers.medium * 1.5, // 30
        paddingRight: spacers.medium * 1.5
      }
    })
  };
};

class ProfileScene extends React.Component<
  ChildProps<IGetUserProps & IProps, IGetUserData>
> {
  public render() {
    const { classes, data, theme } = this.props;

    // We cast empty data to expected type and let
    // component look after pending state
    let user = {} as IUserModel;

    if (data && data.user) {
      user = data.user;
    }

    return (
      <UserComposer
        user={user}
        render={userData => (
          <ResponsiveConsumer>
            {dimensions => {
              const isCompact = dimensions.width < theme.breakpoints.medium;

              return (
                <ProfileSticker
                  align="right"
                  avatar={userData.avatarUrl}
                  className={classes.sticker}
                  compact={isCompact}
                  name={userData.displayName}
                  url={userData.url}
                />
              );
            }}
          </ResponsiveConsumer>
        )}
      />
    );
  }
}

export default compose(
  withAuth,
  withUser,
  withStyles(styles, { withTheme: true })
)(ProfileScene);
