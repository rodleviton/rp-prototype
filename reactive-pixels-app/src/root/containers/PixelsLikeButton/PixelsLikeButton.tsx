import { IAuthState } from "@modules/auth/daos/authReducer";
import { showNotification } from "@modules/notifications/daos/notificationActions";
import { Counter } from "@modules/reactive-pixels-ui/components/Counter";
import { Icon } from "@modules/reactive-pixels-ui/components/Icon";
import { PushButton } from "@modules/reactive-pixels-ui/components/PushButton";
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
  counter: string;
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
    counter: css({
      marginLeft: 10
    }),
    root: css({
      alignItems: "center",
      display: "flex",
      marginTop: spacers.medium * 1.5
    })
  };
};

/**
 * PixelsLikeButton
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <PixelsLikeButton />
 */
export class PixelsLikeButton extends React.PureComponent<IProps> {
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
    const { classes, isLikedByLoggedInUser, likes = [] } = this.props;
    const pushButtonState = isLikedByLoggedInUser ? "primary" : "secondary";

    return (
      <footer className={classes.root}>
        <PushButton onClick={this.onPixelsLike} variant={pushButtonState}>
          <Icon.Heart colour="light" />
        </PushButton>
        <Counter className={classes.counter} total={likes.length || 0} />
      </footer>
    );
  }
}

export default compose(
  withAuth,
  withLikePixelsHandler,
  withStyles(styles)
)(PixelsLikeButton);
