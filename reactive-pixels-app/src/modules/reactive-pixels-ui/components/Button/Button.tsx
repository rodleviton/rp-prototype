import { TinyColor } from "@ctrl/tinycolor";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { IBaseTheme, withStyles } from "../../theme";
export type ButtonVariants = "default" | "primary" | "secondary";
export type IconPosition = "left" | "right";

interface IClasses {
  default: {
    label: string;
    root: string;
  };
  icon: {
    left: string;
    right: string;
  };
  variant: {
    default: {
      label: string;
      root: string;
    };
    primary: {
      label: string;
      root: string;
    };
    secondary: {
      label: string;
      root: string;
    };
  };
}

export interface IProps {
  disabled?: boolean;
  icon?: IconPosition;
  variant?: ButtonVariants;
  onClick: () => void;
  classes: IClasses;
  className?: string;
}

export const styles = (theme: IBaseTheme): IClasses => {
  const { palette, textColourLight } = theme.colours;
  const { fontVariants } = theme.typography;
  const PADDING_HORIZONTAL_BASE = 40;
  const HEIGHT = 44;

  return {
    default: {
      label: css({
        ...fontVariants.button
      }),
      root: css({
        /* Corrects font smoothing for webkit */
        "-moz-osx-font-smoothing": "inherit",

        /* Corrects inability to style clickable `input` types in iOS */
        "-webkit-appearance": "none",
        "-webkit-font-smoothing": "inherit",

        alignItems: "center",
        backgroundColor: palette.white.hex,
        borderRadius: HEIGHT / 2,
        cursor: "pointer",
        display: "flex",
        height: HEIGHT,
        justifyContent: "center",
        paddingLeft: PADDING_HORIZONTAL_BASE,
        paddingRight: PADDING_HORIZONTAL_BASE,
        position: "relative",
        [`&:focus`]: {
          boxShadow: "inset 0px 0px 4px 0px rgba(0,0,0,0.20)"
        }
      })
    },
    icon: {
      left: css({
        paddingRight: PADDING_HORIZONTAL_BASE * 0.75,

        ["> svg"]: {
          left: 16,
          position: "absolute"
        }
      }),
      right: css({
        paddingLeft: PADDING_HORIZONTAL_BASE * 0.75,

        ["> svg"]: {
          position: "absolute",
          right: 16
        }
      })
    },
    variant: {
      default: {
        label: css({
          color: palette.primary.hex
        }),
        root: css({
          borderColor: palette.primary.hex,
          borderStyle: "solid",
          borderWidth: 1
        })
      },
      primary: {
        label: css({
          color: textColourLight
        }),
        root: css({
          backgroundColor: palette.primary.hex,
          borderColor: new TinyColor(palette.primary.hex).darken(5).toString(),
          borderStyle: "solid"
        })
      },
      secondary: {
        label: css({
          color: palette.black.hex
        }),
        root: css({
          borderColor: palette.grey5.hex,
          borderStyle: "solid",
          borderWidth: 1
        })
      }
    }
  };
};

/**
 * Button
 *
 * @description
 * Buttons allow users to take actions, and make choices, with a single tap.
 *
 * @param {string} [size="small"] - Size of button
 * @param {string} [variant="default"] - Button style
 * @param {boolean} [disabled={false}] - Disable button
 *
 * @example
 * <Button variant="primary" size="small">
 *  Hey Joe
 * </Button>
 */

class Button extends React.PureComponent<IProps> {
  public render() {
    const {
      children,
      classes,
      disabled = false,
      className,
      icon,
      variant = "default",
      ...otherProps
    } = this.props;

    const buttonVariantStyles = classes.variant[variant];
    const disabledStyles = disabled ? { opacity: 0.75 } : null;
    const iconStyles = icon ? classes.icon[icon] : null;

    return (
      <button
        disabled={disabled}
        className={classnames(
          classes.default.label,
          classes.default.root,
          buttonVariantStyles.root,
          buttonVariantStyles.label,
          iconStyles,
          disabledStyles,
          className
        )}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
}

export default withStyles(styles)(Button);
