import { IAuthState } from "@modules/auth/daos/authReducer";
import { showNotification } from "@modules/notifications/daos/notificationActions";
import { Button } from "@modules/reactive-pixels-ui/components/Button";
import { IBaseTheme, withStyles } from "@modules/reactive-pixels-ui/theme";
import withAuth from "@root/hoc/withAuth";
import withUserFollowHandler, {
  IUserFollowInputProps
  // IUserFollowVariables
} from "@root/hoc/withUserFollowHandler";
import { css } from "emotion";
import * as React from "react";
import { compose } from "react-apollo";
import { AnyAction, Dispatch } from "redux";

interface IClasses {
  root: string;
}

interface IProps {
  auth: IAuthState;
  classes: IClasses;
  className?: string;
  dispatch: Dispatch<AnyAction>;
  isFollowedByLoggedInUser: boolean;
  onUserFollow: ({ auth, userId, method }: IUserFollowInputProps) => void;
  userId: string;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { spacers } = theme.sizes;
  return {
    root: css({
      alignItems: "center",
      display: "flex",
      marginTop: spacers.medium * 1.5
    })
  };
};

/**
 * UserFollowButton
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <UserFollowButton />
 */
export class UserFollowButton extends React.PureComponent<IProps> {
  public onUserFollow = () => {
    const {
      auth,
      dispatch,
      isFollowedByLoggedInUser,
      onUserFollow,
      userId
    } = this.props;

    if (!auth.user.id) {
      dispatch(showNotification("NOT_AUTHORISED"));
      return;
    }

    onUserFollow({
      auth,
      method: isFollowedByLoggedInUser ? "remove" : "add",
      userId
    });
  };

  public render() {
    const { isFollowedByLoggedInUser } = this.props;
    const buttonState = isFollowedByLoggedInUser ? "primary" : "secondary";

    return (
      <Button onClick={this.onUserFollow} variant={buttonState}>
        {isFollowedByLoggedInUser ? "Following" : "Follow"}
      </Button>
    );
  }
}

export default compose(
  withAuth,
  withUserFollowHandler,
  withStyles(styles)
)(UserFollowButton);
