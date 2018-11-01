import { GithubStrategy } from "@modules/auth/components/GithubStrategy";
import { SocialAuth } from "@modules/auth/components/SocialAuth";
import { logoutAuthUser } from "@modules/auth/daos/authActions";
import { IAuthState } from "@modules/auth/daos/authReducer";
import { LoginButton } from "@modules/reactive-pixels-ui/structures/LoginButton";
import { IBaseTheme, withStyles } from "@modules/reactive-pixels-ui/theme";
import { AuthComposer } from "@root/composers/AuthComposer";
import { IRootState } from "@root/daos/rootReducer";
import { css } from "emotion";
import * as firebase from "firebase/app";
import "firebase/auth";
import * as React from "react";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import { Option } from "react-select/lib/filters";
import { AnyAction, Dispatch } from "redux";
import AuthUserDropdown from "./AuthUserDropdown";
import AuthUserProfileSticker from "./AuthUserProfileSticker";

interface IClasses {
  btn: string;
  loginWrapper: string;
  root: string;
}

interface IProps {
  auth: IAuthState;
  classes: IClasses;
  dispatch: Dispatch<AnyAction>;
  theme: IBaseTheme;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { borderColour } = theme.colours;
  const { spacers } = theme.sizes;
  const { breakpoints } = theme;

  return {
    btn: css({
      alignItems: "center",
      borderLeft: `1px solid ${borderColour}`,
      borderRight: `1px solid ${borderColour}`,
      display: "flex",
      height: "100%",
      justifyContent: "center",
      outline: 0,
      width: 40
    }),
    loginWrapper: css({
      paddingLeft: spacers.small * 1.5, // 15
      paddingRight: spacers.small * 1.5, // 15
      [`@media (min-width: ${breakpoints.medium}px)`]: {
        paddingLeft: spacers.medium * 1.5, // 30
        paddingRight: spacers.medium * 1.5 // 30
      }
    }),
    root: css({
      alignItems: "center",
      borderLeft: `1px solid ${borderColour}`,
      display: "flex",
      height: "100%"
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
  public onSelect = ({ data }: Option) => {
    data.onClickHandler();
  };

  public render() {
    const { auth, dispatch, classes, theme, ...otherProps } = this.props;

    const options: Option[] = [
      {
        data: {
          onClickHandler: () =>
            firebase
              .auth()
              .signOut()
              .then(() => {
                dispatch(logoutAuthUser());
              })
        },
        label: "Sign out",
        value: "LOGOUT"
      }
    ];

    return (
      <div className={classes.root}>
        <AuthComposer
          {...otherProps}
          auth={auth}
          render={authData => {
            if (authData.isAuthenticated) {
              return (
                <React.Fragment>
                  <AuthUserProfileSticker />
                  <AuthUserDropdown
                    options={options}
                    onSelect={this.onSelect}
                  />
                </React.Fragment>
              );
            }

            return (
              <div className={classes.loginWrapper}>
                <SocialAuth>
                  <GithubStrategy
                    render={({ onClick }) => <LoginButton onClick={onClick} />}
                  />
                </SocialAuth>
              </div>
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

export default compose(
  connect(mapStateToProps),
  withStyles(styles, { withTheme: true })
)(UserAuthWidget);
