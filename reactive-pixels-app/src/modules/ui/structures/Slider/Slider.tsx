import { IBaseTheme, withStyles } from "@modules/ui/theme";
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
  return {
    root: css({
      display: "flex",
      height: "calc(100vh - 90px)",
      justifyContent: "center",
      position: "fixed",
      width: "100%"
    })
  };
};

/**
 * Slider
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <Slider />
 */
class Slider extends React.PureComponent<IProps> {
  public render() {
    const { children, classes, className, ...otherProps } = this.props;

    return (
      <div className={classnames(classes.root, className)} {...otherProps}>
        {children}
      </div>
    );
  }
}

export default withStyles(styles)(Slider);
