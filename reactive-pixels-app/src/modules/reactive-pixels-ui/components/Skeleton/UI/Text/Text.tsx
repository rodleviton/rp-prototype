import { IBaseTheme, withStyles } from "@modules/reactive-pixels-ui/theme";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";

interface IClasses {
  root: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { palette } = theme.colours;

  return {
    root: css({
      background: palette.grey5.hex,
      borderRadius: 5,
      height: 10,
      width: "100%"
    })
  };
};

/**
 * Skeleton Text
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <Skeleton />
 */
class Skeleton extends React.PureComponent<IProps> {
  public render() {
    const { classes, className, ...otherProps } = this.props;

    return (
      <div className={classnames(classes.root, className)} {...otherProps} />
    );
  }
}

export default withStyles(styles)(Skeleton);
