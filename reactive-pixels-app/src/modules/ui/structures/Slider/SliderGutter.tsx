import { Box } from "@modules/ui/components/Box";
import { PushButton } from "@modules/ui/components/PushButton";
import { IBaseTheme, withStyles } from "@modules/ui/theme";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";

interface IClasses {
  button: string;
  root: string;
}

interface IProps {
  active: boolean;
  classes: IClasses;
  className?: string;
  onClick: () => any;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { borderColour, palette } = theme.colours;

  return {
    button: css({
      borderLeft: `none !important`,
      borderRadius: `0 !important`,
      borderRight: `none !important`
    }),
    root: css({
      alignItems: "center",
      background: palette.white.hex,
      borderLeft: `1px solid ${borderColour}`,
      borderRight: `1px solid ${borderColour}`,
      display: "flex",
      height: `calc(100vh - 90px)`
    })
  };
};

/**
 * SliderGutter
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <SliderGutter />
 */
class SliderGutter extends React.PureComponent<IProps> {
  public render() {
    const {
      active,
      children,
      classes,
      className,
      onClick,
      ...otherProps
    } = this.props;
    const buttonVariant = active ? "primary" : "secondary";

    return (
      <Box
        className={classnames(classes.root, className)}
        justifyContent="center"
        {...otherProps}
      >
        <PushButton
          className={classes.button}
          onClick={onClick}
          variant={buttonVariant}
        >
          {children}
        </PushButton>
      </Box>
    );
  }
}

export default withStyles(styles)(SliderGutter);
