import { TinyColor } from "@ctrl/tinycolor";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { IBaseTheme, withStyles } from "../../theme";

export type ButtonVariants = "default" | "primary" | "secondary";

interface IClasses {
  base: {
    root: string;
  };
  variant: {
    default: {
      root: string;
    };
    primary: {
      root: string;
    };
    secondary: {
      root: string;
    };
  };
}

interface IProps {
  classes: IClasses;
  onClick: () => void;
  className?: string;
  variant?: ButtonVariants;
}

export const styles = (theme: IBaseTheme): IClasses => {
  const { palette } = theme.colours;
  const BUTTON_SIZE = 40;

  return {
    base: {
      root: css({
        /* Corrects font smoothing for webkit */
        "-moz-osx-font-smoothing": "inherit",

        /* Corrects inability to style clickable `input` types in iOS */
        "-webkit-appearance": "none",
        "-webkit-font-smoothing": "inherit",

        alignItems: "center",
        borderRadius: BUTTON_SIZE / 2,
        borderStyle: "solid",
        borderWidth: 1,
        cursor: "pointer",
        display: "flex",
        height: BUTTON_SIZE,
        justifyContent: "center",
        outline: 0,
        width: BUTTON_SIZE,

        ["> svg"]: {
          transform: `scale(1.2)`
        }
      })
    },
    variant: {
      default: {
        root: css({
          backgroundColor: palette.white.hex,
          borderColor: palette.primary.hex,
          borderStyle: "solid",
          ["&:focus"]: {
            borderColor: new TinyColor(palette.primary.hex)
              .darken(10)
              .toString(),
            boxShadow: `0 0 5px ${palette.grey5.hex}`
          },
          [`&:active`]: {
            boxShadow: `0 0 5px ${palette.grey5.hex}, inset 0px 0px 4px 0px ${
              palette.grey4.hex
            }`
          }
        })
      },
      primary: {
        root: css({
          backgroundColor: palette.primary.hex,
          borderColor: new TinyColor(palette.primary.hex).darken(5).toString(),
          ["&:focus"]: {
            borderColor: new TinyColor(palette.primary.hex)
              .darken(10)
              .toString(),
            boxShadow: `0 0 5px ${palette.primary.hex}`
          },
          [`&:active`]: {
            boxShadow: `0 0 5px ${palette.primary.hex}, inset 0px 0px 4px 0px ${
              palette.grey4.hex
            }`
          }
        })
      },
      secondary: {
        root: css({
          borderColor: palette.grey5.hex,
          borderStyle: "solid",
          borderWidth: 1,
          ["&:focus"]: {
            borderColor: palette.grey4.hex,
            boxShadow: `0 0 5px ${palette.grey5.hex}`
          },
          [`&:active`]: {
            boxShadow: `0 0 5px ${palette.grey5.hex}, inset 0px 0px 4px 0px ${
              palette.grey4.hex
            }`
          }
        })
      }
    }
  };
};

/**
 * PushButton
 *
 * @description
 * A round button to display an icon and action.
 *
 * @example
 * <PushButton><Icon /></PushButton>
 */

class PushButton extends React.PureComponent<IProps> {
  public render() {
    const {
      children,
      classes,
      onClick,
      className,
      variant = "default",
      ...otherProps
    } = this.props;

    const buttonStyles = classes.variant[variant].root;

    return (
      <button
        onClick={onClick}
        className={classnames(classes.base.root, buttonStyles, className)}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
}

export default withStyles(styles)(PushButton);
