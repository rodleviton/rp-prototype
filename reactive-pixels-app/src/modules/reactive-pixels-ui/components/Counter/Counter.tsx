import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { IBaseTheme, withStyles } from "../../theme";

interface IClasses {
  arrow: string;
  body: string;
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
      background: palette.white.hex,
      borderBottom: `1px solid ${palette.grey5.hex}`,
      borderLeft: `1px solid ${palette.grey5.hex}`,
      height: 10,
      left: -5,
      position: "absolute",
      top: 12,
      transform: "rotate(45deg)",
      width: 10,
      zIndex: 2
    }),
    body: css({
      alignItems: "center",
      background: palette.white.hex,
      border: `1px solid ${palette.grey5.hex}`,
      color: textColourDark,
      display: "flex",
      fontWeight: fontWeights.bold,
      height: 32,
      justifyContent: "center",
      padding: "0 10px",
      position: "relative",
      zIndex: 1
    }),
    root: css({
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
      <div className={classnames(classes.root, className)}>
        <span className={classes.arrow} />
        <div className={classes.body} {...otherProps}>
          <span>{total}</span>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Counter);
