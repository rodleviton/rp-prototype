import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { IBaseTheme, withStyles } from "../../theme";

interface IClasses {
  root: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
  to: string;
}

const styles = (theme: IBaseTheme): IClasses => {
  return {
    root: css({})
  };
};

/**
 * Link
 *
 * @description
 * Navigation link component
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <Link to="/some/url" />
 */
export class Link extends React.PureComponent<IProps> {
  public render() {
    const { children, classes, className, to, ...otherProps } = this.props;

    return (
      <RouterLink
        to={to}
        className={classnames(classes.root, className)}
        {...otherProps}
      >
        {children}
      </RouterLink>
    );
  }
}

export default withStyles(styles)(Link);
