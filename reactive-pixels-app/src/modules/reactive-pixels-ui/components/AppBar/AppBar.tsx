import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { IBaseTheme, withStyles } from "../../theme";

interface IClasses {
  root: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { borderColour, palette } = theme.colours;

  return {
    root: css({
      alignItems: "center",
      backgroundColor: palette.white.hex,
      borderBottom: `1px solid ${borderColour}`,
      borderTop: `1px solid ${borderColour}`,
      display: "flex",
      flexDirection: "row",
      width: "100%"
    })
  };
};

/**
 * Container for brand and navigation elements
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <AppBar />
 */
export class AppBar extends React.PureComponent<IProps> {
  public render() {
    const { classes, className, ...otherProps } = this.props;

    return (
      <div className={classnames(classes.root, className)} {...otherProps} />
    );
  }
}

export default withStyles(styles)(AppBar);
