import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { IBaseTheme, withStyles } from "../../theme";

interface IChipClasses {
  root: string;
}

interface IProps {
  classes: IChipClasses;
  className?: string;
  label: string;
}

const styles = (theme: IBaseTheme): IChipClasses => {
  const { spacers } = theme.sizes;
  const { palette } = theme.colours;

  return {
    root: css({
      alignItems: "center",
      background: palette.grey2.hex,
      borderRadius: 12,
      color: palette.white.hex,
      display: "inline-flex",
      flexGrow: 0,
      fontSize: "1rem",
      height: 24,
      paddingLeft: spacers.medium,
      paddingRight: spacers.medium,
      textTransform: "uppercase"
    })
  };
};

/**
 * Badge container
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <Chip />
 */
export class Chip extends React.PureComponent<IProps> {
  public render() {
    const { classes, className, label, ...otherProps } = this.props;

    return (
      <div className={classnames(classes.root, className)} {...otherProps}>
        <span>{label}</span>
      </div>
    );
  }
}

export default withStyles(styles)(Chip);
