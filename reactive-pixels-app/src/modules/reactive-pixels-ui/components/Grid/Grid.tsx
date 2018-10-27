import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { Flex } from "rebass";
import { IBaseTheme, withStyles } from "../../theme";

interface IGridClasses {
  root: string;
}

interface IProps {
  classes: IGridClasses;
  className?: string;
}

const styles = (theme: IBaseTheme): IGridClasses => {
  return {
    root: css({})
  };
};

/**
 * Simple Flex Grid
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <Grid />
 */
class Grid extends React.PureComponent<IProps> {
  public render() {
    const { children, classes, className, ...otherProps } = this.props;

    return (
      <Flex className={classnames(classes.root, className)} {...otherProps}>
        {children}
      </Flex>
    );
  }
}

export default withStyles(styles)(Grid);
