import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { AppBar } from "../../components/AppBar";
import { Link } from "../../components/Link";
import { Logo } from "../../components/Logo";
import { IBaseTheme, withStyles } from "../../theme";

interface IHeaderClasses {
  brand: string;
  root: string;
}

interface IProps {
  classes: IHeaderClasses;
  className?: string;
}

const styles = (theme: IBaseTheme): IHeaderClasses => {
  const { breakpoints } = theme;
  const { spacers } = theme.sizes;

  return {
    brand: css({
      paddingLeft: spacers.small * 1.5,
      [`@media (min-width: ${breakpoints.medium}px)`]: {
        paddingLeft: spacers.medium * 1.5
      }
    }),
    root: css({
      height: 90,
      justifyContent: "space-between",

      position: "fixed",
      top: 0,
      zIndex: 100
    })
  };
};

/**
 * Main application Header
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <Header />
 */
export class Header extends React.PureComponent<IProps> {
  public render() {
    const { classes, className, children, ...otherProps } = this.props;

    return (
      <AppBar className={classnames(classes.root, className)} {...otherProps}>
        <Link to={"/"} className={classes.brand}>
          <Logo />
        </Link>

        {children}
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
