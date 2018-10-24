import { IBaseTheme, withStyles } from "@modules/ui/theme";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { Box as Cell } from "rebass";

interface IBoxClasses {
  root: string;
}

interface IProps {
  classes: IBoxClasses;
  className?: string;
}

const styles = (theme: IBaseTheme): IBoxClasses => {
  return {
    root: css({})
  };
};

/**
 * Box
 *
 * @description
 * Responsive box-model layout component.
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <Box />
 */
class Box extends React.PureComponent<IProps> {
  public render() {
    const { children, classes, className, ...otherProps } = this.props;

    return (
      <Cell className={classnames(classes.root, className)} {...otherProps}>
        {children}
      </Cell>
    );
  }
}

export default withStyles(styles)(Box);
