import { IAuthState } from "@modules/auth/daos/authReducer";
import { showNotification } from "@modules/notifications/daos/notificationActions";
import { Button } from "@modules/reactive-pixels-ui/components/Button";
import { IBaseTheme, withStyles } from "@modules/reactive-pixels-ui/theme";
import withAuth from "@root/hoc/withAuth";
import withLikePixelsHandler, {
  IPixelsLikeInputProps,
  IPixelsLikeVariables
} from "@root/hoc/withLikePixelsHandler";
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
  isLikedByLoggedInUser: boolean;
  likes: string[];
  userLikedPixels: string[];
  onUpdatePixelsLikesVariables: IPixelsLikeVariables;
  onPixelsLike: (
    { auth, id, likes, method, userLikedPixels }: IPixelsLikeInputProps
  ) => void;
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
 * FollowUserButton
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <FollowUserButton />
 */
export class FollowUserButton extends React.PureComponent<IProps> {
  public onPixelsLike = () => {
    const {
      auth,
      dispatch,
      likes = [],
      onPixelsLike,
      onUpdatePixelsLikesVariables,
      userLikedPixels
    } = this.props;

    if (!auth.user.id) {
      dispatch(showNotification("NOT_AUTHORISED"));

      return;
    }

    onPixelsLike({
      auth,
      id: onUpdatePixelsLikesVariables.id,
      likes,
      method: onUpdatePixelsLikesVariables.method,
      userLikedPixels
    });
  };
  public render() {
    // const { classes, isLikedByLoggedInUser, likes = [] } = this.props;
    // const pushButtonState = isLikedByLoggedInUser ? "primary" : "secondary";

    return (
      <Button onClick={this.onPixelsLike} variant="default">
        Follow
      </Button>
    );
  }
}

export default compose(
  withAuth,
  withLikePixelsHandler,
  withStyles(styles)
)(FollowUserButton);
