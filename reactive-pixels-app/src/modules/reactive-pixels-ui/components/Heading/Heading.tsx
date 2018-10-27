import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { IBaseTheme, withStyles } from "../../theme";

type Colour = "light" | "dark";
type Variants =
  | "display1"
  | "display2"
  | "display3"
  | "display4"
  | "display5"
  | "display6";
type Headings = "1" | "2" | "3" | "4" | "5" | "6";
type FontWeights = "normal" | "bold";

enum HeadlineMappings {
  display1 = "1",
  display2 = "2",
  display3 = "3",
  display4 = "4",
  display5 = "5",
  display6 = "6"
}

interface IProps {
  center?: boolean;
  colour?: Colour;
  classes: IClasses;
  fontWeight?: FontWeights;
  headlineMapping?: Headings;
  margin?: boolean;
  className?: string;
  variant?: Variants;
}

export interface IClasses {
  bold: string;
  center: string;
  display1: string;
  display2: string;
  display3: string;
  display4: string;
  display5: string;
  display6: string;
  dark: string;
  light: string;
  noMargin: string;
  normal: string;
}

export const styles = (theme: IBaseTheme): IClasses => {
  const { fontWeights, fontVariants } = theme.typography;
  const { headingColourDark, headingColourLight } = theme.colours;

  return {
    bold: css({
      fontWeight: fontWeights.bold
    }),
    center: css({
      textAlign: "center"
    }),
    dark: css({
      color: headingColourDark
    }),
    display1: css({
      ...fontVariants.display1
    }),
    display2: css({
      ...fontVariants.display2
    }),
    display3: css({
      ...fontVariants.display3
    }),
    display4: css({
      ...fontVariants.display4
    }),
    display5: css({
      ...fontVariants.display5
    }),
    display6: css({
      ...fontVariants.display6
    }),
    light: css({
      color: headingColourLight
    }),
    noMargin: css({
      marginBottom: 0,
      marginTop: 0
    }),
    normal: css({
      fontWeight: fontWeights.normal
    })
  };
};

/**
 * Heading
 *
 * @description
 * Low level headline component. Provides configuration for headings.
 *
 * @param {string} [colour="dark"] - Size of button
 * @param {string} [fontWeight="normal"] - Button style
 * @param {string} [headlineMapping="[1 | 2 | 3 | 4]"] - Disable button
 * @param {string} [variant="display1"] - Disable button
 *
 * @example
 * <Heading variant="display1" colour="dark" fontWeight="bold" headlineMapping="1">
 *  Heading 1
 * </Heading>
 */
class Heading extends React.PureComponent<IProps> {
  public render() {
    const {
      center = false,
      children,
      classes,
      colour = "dark",
      fontWeight = "normal",
      headlineMapping,
      margin = true,
      className,
      variant = "display1",
      ...otherProps
    } = this.props;

    const marginStyles = !margin ? classes.noMargin : null;
    const alignStyles = center ? classes.center : null;

    // Semantic heading type
    const heading = headlineMapping
      ? headlineMapping
      : HeadlineMappings[variant];

    // Set h1, h2, h3, h4, h5 or h6
    const Tag = `h${heading}`;

    return (
      <Tag
        className={classnames(
          classes[variant],
          classes[colour],
          classes[fontWeight],
          marginStyles,
          alignStyles,
          className
        )}
        {...otherProps}
      >
        {children}
      </Tag>
    );
  }
}

export default withStyles(styles)(Heading);
