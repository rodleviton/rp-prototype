import * as classnames from "classnames";
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
  return {
    root: css({
      alignItems: "center",
      display: "flex",
      flexDirection: "column"
    })
  };
};

/**
 * PixelsWrapper
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <PixelsWrapper />
 */
export class PixelsWrapper extends React.PureComponent<IProps> {
  public render() {
    const { children, className, classes, ...otherProps } = this.props;

    return (
      <div className={classnames(classes.root, className)} {...otherProps}>
        {children}
      </div>
    );
  }
}

export default withStyles(styles)(PixelsWrapper);
