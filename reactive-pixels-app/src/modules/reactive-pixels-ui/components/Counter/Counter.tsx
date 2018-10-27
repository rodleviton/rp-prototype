import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { IBaseTheme, withStyles } from "../../theme";

interface IClasses {
  arrow: string;
  root: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
  total: string;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { palette, textColourDark } = theme.colours;
  const { fontWeights } = theme.typography;

  return {
    arrow: css({
      background: palette.grey5.hex,
      height: 10,
      left: -5,
      position: "absolute",
      transform: "rotate(45deg)",
      width: 10
    }),
    root: css({
      alignItems: "center",
      background: palette.grey5.hex,
      color: textColourDark,
      display: "flex",
      fontWeight: fontWeights.bold,
      height: 32,
      justifyContent: "center",
      padding: "0 10px",
      position: "relative"
    })
  };
};

/**
 * Counter
 * @param {string} [className=""] - Extend css classes to override default styling.
 *
 * @example
 * <Counter />
 */
export class Counter extends React.PureComponent<IProps> {
  public render() {
    const { classes, className, total, ...otherProps } = this.props;

    return (
      <div className={classnames(classes.root, className)} {...otherProps}>
        <span className={classes.arrow} />
        <span>{total}</span>
      </div>
    );
  }
}

export default withStyles(styles)(Counter);
