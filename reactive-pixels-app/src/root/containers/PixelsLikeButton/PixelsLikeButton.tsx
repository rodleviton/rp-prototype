import { IAuthState } from "@modules/auth/daos/authReducer";
import { GET_PIXELS } from "@modules/graphql/GetPixelsQuery";
import UpdatePixelsLikesMutation, {
  IVariables,
  UPDATE_PIXELS_LIKES
} from "@modules/graphql/UpdatePixelsLikesMutation";
import { showNotification } from "@modules/notifications/daos/notificationActions";
import { Counter } from "@modules/reactive-pixels-ui/components//Counter";
import { Icon } from "@modules/reactive-pixels-ui/components//Icon";
import { PushButton } from "@modules/reactive-pixels-ui/components/PushButton";
import { IBaseTheme, withStyles } from "@modules/reactive-pixels-ui/theme";
import {
  addItemToArray,
  removeItemFromArray
} from "@modules/utils/arrayUtilities";
import { IRootState } from "@root/daos/rootReducer";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";

interface IClasses {
  actions: string;
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
  onUpdatePixelsLikesVariables: IVariables;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { spacers } = theme.sizes;

  return {
    actions: css({
      alignItems: "center",
      display: "flex",
      marginTop: spacers.medium * 1.5
    }),
    counter: css({
      marginLeft: 10
    }),
    root: css({
      alignItems: "center",
      display: "flex",
      flexDirection: "column"
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
  public render() {
    const {
      children,
      classes,
      className,
      isLikedByLoggedInUser,
      onUpdatePixelsLikesVariables,
      likes = []
    } = this.props;

    const pushButtonState = isLikedByLoggedInUser ? "primary" : "secondary";

    return (
      <div className={classnames(className, classes.root)}>
        {children}
        <footer className={classes.actions}>
          <UpdatePixelsLikesMutation mutation={UPDATE_PIXELS_LIKES}>
            {action => {
              const onClick = () => {
                const { auth, dispatch } = this.props;
                const { id, method } = onUpdatePixelsLikesVariables;

                if (!auth.user.id) {
                  dispatch(showNotification("NOT_AUTHORISED"));
                } else {
                  action({
                    optimisticResponse: {
                      updatePixelsLikes: {
                        __typename: "UpdatePixelsLikesResponse",
                        likes:
                          method === "add"
                            ? addItemToArray(likes, auth.user.id)
                            : removeItemFromArray(likes, auth.user.id)
                      }
                    },
                    update: (cache, { data: { updatePixelsLikes } }) => {
                      const { pixels } = cache.readQuery({
                        query: GET_PIXELS,
                        variables: {
                          id
                        }
                      }) as any; // TODO - FIX THIS

                      cache.writeQuery({
                        data: {
                          pixels: {
                            ...pixels,
                            likes: updatePixelsLikes.likes
                          }
                        },
                        query: GET_PIXELS,
                        variables: {
                          id
                        }
                      });
                    },
                    variables: onUpdatePixelsLikesVariables
                  });
                }
              };

              return (
                <React.Fragment>
                  <PushButton onClick={onClick} variant={pushButtonState}>
                    <Icon.Heart colour="light" />
                  </PushButton>
                  <Counter
                    className={classes.counter}
                    total={likes.length || 0}
                  />
                </React.Fragment>
              );
            }}
          </UpdatePixelsLikesMutation>
        </footer>
      </div>
    );
  }
}

const mapStateToProp = (state: IRootState) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProp)(withStyles(styles)(PixelsLikeButton));
