import { IBaseTheme, withStyles } from "@modules/ui/theme";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";

type Colour = "light" | "dark";
type Variant = "body1" | "body2" | "subheading";

export interface IClasses {
  body1: string;
  body2: string;
  dark: string;
  center: string;
  light: string;
  noMargin: string;
  subheading: string;
}

interface IProps {
  accessible?: boolean;
  accessibilityLabel?: string;
  className?: string;
  theme: IBaseTheme;
  center?: boolean;
  classes: IClasses;
  colour?: Colour;
  margin?: boolean;
  variant?: Variant;
}

export const styles = (theme: IBaseTheme): IClasses => {
  const { fontVariants } = theme.typography;
  const { textColourDark, textColourLight } = theme.colours;

  return {
    body1: css({
      ...fontVariants.body1
    }),
    body2: css({
      ...fontVariants.body2
    }),
    center: css({
      textAlign: "center"
    }),
    dark: css({
      color: textColourDark
    }),
    light: css({
      color: textColourLight
    }),
    noMargin: css({
      marginBottom: 0
    }),
    subheading: css({
      ...fontVariants.subheading
    })
  };
};

/**
 * Paragraph
 *
 * @description
 * Used for body text.
 *
 * @param {string} [colour="dark"] - text colour ("light" | "dark")
 * @param {string} [variant="body1"] - paragraph font size ("subheading" | "body1" | "body2")
 *
 * @example
 * <Paragraph colour="dark" variant="body1" />
 */

class Paragraph extends React.PureComponent<IProps> {
  public render() {
    const {
      center = false,
      children,
      classes,
      colour = "dark",
      margin = true,
      className,
      variant = "body1",
      ...otherProps
    } = this.props;

    const marginStyles = !margin ? classes.noMargin : null;
    const alignStyles = center ? classes.center : null;

    return (
      <p
        className={classnames(
          classes[variant],
          classes[colour],
          marginStyles,
          alignStyles,
          className
        )}
        {...otherProps}
      >
        {children}
      </p>
    );
  }
}

export default withStyles(styles)(Paragraph);
