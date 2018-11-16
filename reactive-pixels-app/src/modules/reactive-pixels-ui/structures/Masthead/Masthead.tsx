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
  const { spacers } = theme.sizes;

  return {
    root: css({
      alignItems: "center",
      background: palette.white.hex,
      borderBottom: `1px solid ${borderColour}`,
      display: "flex",
      justifyContent: "center",
      paddingBottom: spacers.large,
      paddingTop: spacers.large,
      position: "relative",
      width: "100%"
    })
  };
};

/**
 * Masthead
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <Masthead />
 */
export class Masthead extends React.PureComponent<IProps> {
  public render() {
    const { children, className, classes, ...otherProps } = this.props;

    return (
      <header className={classnames(className, classes.root)} {...otherProps}>
        {children}
      </header>
    );
  }
}

export default withStyles(styles)(Masthead);
