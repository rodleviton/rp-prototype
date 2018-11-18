import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { IBaseTheme, withStyles } from "../../theme";

interface IClasses {
  card: string;
  root: string;
  shadow: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
}

const PIXELS_WIDTH = 340;
const PIXELS_HEIGHT = 460;

const styles = (theme: IBaseTheme): IClasses => {
  const { palette } = theme.colours;

  return {
    card: css({
      alignItems: "center",
      background: palette.white.hex,
      borderRadius: 12,
      display: "flex",
      height: PIXELS_HEIGHT,
      justifyContent: "center",
      overflow: "hidden",
      position: "relative",
      width: PIXELS_WIDTH,
      zIndex: 2
    }),
    root: css({
      height: PIXELS_HEIGHT,
      position: "relative",
      width: PIXELS_WIDTH
    }),
    shadow: css({
      background: "transparent",
      bottom: 0,
      boxShadow: "0px 15px 75px 0px rgba(0,0,0,0.35)",
      height: 100,
      left: "50%",
      position: "absolute",
      transform: "translate(-50%, 0)",
      transition: "all 0.25s",
      width: 300,
      zIndex: 1
    })
  };
};

/**
 * ReactivePixels card component
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <PixelsCard />
 */
export class PixelsCard extends React.PureComponent<IProps> {
  public render() {
    const { children, classes, className, ...otherProps } = this.props;

    return (
      <div className={classnames(classes.root, className)} {...otherProps}>
        <div className={classes.card}>{children}</div>
        <div className={classes.shadow} />
      </div>
    );
  }
}

export default withStyles(styles)(PixelsCard);
