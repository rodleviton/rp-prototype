import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { IBaseTheme, withStyles } from "../../theme";

interface IClasses {
  logo: string;
  root: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
  scale?: number;
  theme: IBaseTheme;
}

const LOGO_HEIGHT = 62;
const LOGO_WIDTH = 241;

const styles = (theme: IBaseTheme): IClasses => {
  return {
    logo: css({}),
    root: css({
      overflow: "hidden"
    })
  };
};

/**
 * ReactivePixels brand logo
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @param {number} [scale="1"] - Multiplier to increase/decrease scale of logo.
 * @example
 * <Logo scale={2} />
 */
export class Logo extends React.PureComponent<IProps> {
  public render() {
    const { classes, className, scale = 1, theme, ...otherProps } = this.props;
    const { breakpoints } = theme;

    const computedStyles = {
      logo: css({
        height: Math.round(LOGO_HEIGHT * scale),
        minHeight: Math.round(LOGO_HEIGHT * scale),
        minWidth: Math.round(LOGO_WIDTH * scale),
        width: Math.round(LOGO_WIDTH * scale)
      }),
      root: css({
        width: Math.round(60 * scale),
        [`@media (min-width: ${breakpoints.medium}px)`]: {
          width: Math.round(LOGO_WIDTH * scale)
        }
      })
    };

    return (
      <div
        className={classnames(classes.root, computedStyles.root, className)}
        {...otherProps}
      >
        <img
          className={classnames(classes.logo, computedStyles.logo)}
          src={require("./assets/logo.svg")}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Logo);
