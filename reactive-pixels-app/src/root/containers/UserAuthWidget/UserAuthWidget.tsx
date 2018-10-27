import { GithubStrategy } from "@modules/auth/components/GithubStrategy";
import { SocialAuth } from "@modules/auth/components/SocialAuth";
import { IAuthState } from "@modules/auth/daos/authReducer";
import { LoginButton } from "@modules/reactive-pixels-ui/structures/LoginButton";
import { ProfileSticker } from "@modules/reactive-pixels-ui/structures/ProfileSticker";
import { IBaseTheme, withStyles } from "@modules/reactive-pixels-ui/theme";
import { ResponsiveConsumer } from "@modules/reactive-pixels-ui/theme/ResponsiveProvider";
import { AuthComposer } from "@root/composers/AuthComposer";
import { UserComposer } from "@root/composers/UserComposer";
import { IRootState } from "@root/daos/rootReducer";
import { css } from "emotion";
import * as React from "react";
import { connect } from "react-redux";

interface IClasses {
  root: string;
}

interface IProps {
  auth: IAuthState;
  classes: IClasses;
  theme: IBaseTheme;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { borderColour } = theme.colours;
  const { spacers } = theme.sizes;
  const { breakpoints } = theme;

  return {
    root: css({
      alignItems: "center",
      borderLeft: `1px solid ${borderColour}`,
      display: "flex",
      height: "100%",
      paddingLeft: spacers.small * 1.5, // 15
      [`@media (min-width: ${breakpoints.medium}px)`]: {
        paddingLeft: spacers.medium * 1.5 // 30
      }
    })
  };
};

/**
 * UserAuthWidget
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <UserAuthWidget />
 */

class UserAuthWidget extends React.PureComponent<IProps> {
  public render() {
    const { auth, classes, theme, ...otherProps } = this.props;

    return (
      <div className={classes.root}>
        <AuthComposer
          {...otherProps}
          auth={auth}
          render={authData => {
            if (authData.isAuthenticated) {
              return (
                <UserComposer
                  user={authData.user}
                  render={userData => (
                    <ResponsiveConsumer>
                      {dimensions => {
                        const isCompact =
                          dimensions.width < theme.breakpoints.medium;

                        return (
                          <ProfileSticker
                            align="right"
                            avatar={userData.avatarUrl}
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
            return (
              <SocialAuth>
                <GithubStrategy
                  render={({ onClick }) => <LoginButton onClick={onClick} />}
                />
              </SocialAuth>
            );
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state: IRootState) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(UserAuthWidget)
);
