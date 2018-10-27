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
      margin: 20
    })
  };
};

/**
 * PixelsGridItem
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <PixelsGridItem />
 */
export class PixelsGridItem extends React.PureComponent<IProps> {
  public render() {
    const { classes, className, children, ...otherProps } = this.props;

    return (
      <Box className={classnames(classes.root, className)} {...otherProps}>
        {children}
      </Box>
    );
  }
}

export default withStyles(styles)(PixelsGridItem);
