import { Counter } from "@modules/ui/components/Counter";
import { Icon } from "@modules/ui/components/Icon";
import { PushButton } from "@modules/ui/components/PushButton";
import { IBaseTheme, withStyles } from "@modules/ui/theme";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";

interface IClasses {
  actions: string;
  counter: string;
  root: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
  isLikedByLoggedInUser: boolean;
  numberOfLikes: number;
  onPixelsLike: () => void;
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
 * PixelsContainer
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <PixelsContainer />
 */
export class PixelsContainer extends React.PureComponent<IProps> {
  public render() {
    const {
      children,
      classes,
      className,
      isLikedByLoggedInUser,
      numberOfLikes,
      onPixelsLike,
      ...otherProps
    } = this.props;

    const pushButtonState = isLikedByLoggedInUser ? "primary" : "secondary";

    return (
      <div className={classnames(className, classes.root)} {...otherProps}>
        {children}
        <footer className={classes.actions}>
          <PushButton onClick={onPixelsLike} variant={pushButtonState}>
            <Icon.Heart colour="light" />
          </PushButton>
          <Counter className={classes.counter} total={numberOfLikes} />
        </footer>
      </div>
    );
  }
}

export default withStyles(styles)(PixelsContainer);
