import { TinyColor } from "@ctrl/tinycolor";
import { IBaseTheme, withStyles } from "@modules/ui/theme";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";

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
  const { borderColour, palette } = theme.colours;
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
        width: BUTTON_SIZE,

        [`&:focus`]: {
          boxShadow: "inset 0px 0px 4px 0px rgba(0,0,0,0.20)",
          outline: 0
        },

        ["> svg"]: {
          transform: `scale(1.2)`
        }
      })
    },
    variant: {
      default: {
        root: css({
          backgroundColor: palette.white.hex,
          borderColor: borderColour
        })
      },
      primary: {
        root: css({
          backgroundColor: palette.primary.hex,
          borderColor: new TinyColor(palette.primary.hex).darken(5).toString()
        })
      },
      secondary: {
        root: css({
          backgroundColor: palette.grey3.hex,
          borderColor: new TinyColor(palette.grey3.hex).darken(5).toString()
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
