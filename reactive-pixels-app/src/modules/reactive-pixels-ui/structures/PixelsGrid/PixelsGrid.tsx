import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { Grid } from "../../components/Grid";
import { IBaseTheme, withStyles } from "../../theme";

interface IClasses {
  root: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { breakpoints } = theme;
  const GUTTER = 20;
  const ITEM_WIDTH = 340 + GUTTER * 2;

  return {
    root: css({
      margin: "0 auto",
      width: ITEM_WIDTH,

      [`@media (min-width: ${breakpoints.medium}px)`]: {
        width: ITEM_WIDTH * 2
      },
      [`@media (min-width: ${breakpoints.xl}px)`]: {
        width: ITEM_WIDTH * 3
      },
      [`@media (min-width: ${breakpoints.xxl}px)`]: {
        width: ITEM_WIDTH * 4
      }
    })
  };
};

/**
 * PixelsGrid
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <PixelsGrid />
 */
export class PixelsGrid extends React.PureComponent<IProps> {
  public render() {
    const { classes, className, children, ...otherProps } = this.props;

    return (
      <Grid
        flexWrap="wrap"
        className={classnames(classes.root, className)}
        {...otherProps}
      >
        {children}
      </Grid>
    );
  }
}

export default withStyles(styles)(PixelsGrid);
