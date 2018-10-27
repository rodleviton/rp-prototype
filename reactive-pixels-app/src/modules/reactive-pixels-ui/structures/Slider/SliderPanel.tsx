import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { Box } from "../../components/Box";
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
      display: "flex",
      height: "100%",
      position: "absolute"
    })
  };
};

/**
 * SliderPanel
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <SliderPanel />
 */
class SliderPanel extends React.PureComponent<IProps> {
  public render() {
    const { children, classes, className, ...otherProps } = this.props;

    return (
      <Box className={classnames(classes.root, className)} {...otherProps}>
        {children}
      </Box>
    );
  }
}

export default withStyles(styles)(SliderPanel);
