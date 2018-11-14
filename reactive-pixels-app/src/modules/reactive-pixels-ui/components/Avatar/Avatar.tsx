import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { IBaseTheme, withStyles } from "../../theme";
import { ImageLoader } from "../ILoader";

type Size = "small" | "medium" | "large";

interface IClasses {
  root: string;
  small: string;
  medium: string;
  large: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
  fade?: boolean;
  size?: Size;
  url: string;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { borderColourDark, palette } = theme.colours;

  return {
    large: css({
      borderRadius: 60,
      borderWidth: 4,
      height: 120,
      minWidth: 60,
      width: 120
    }),
    medium: css({
      borderRadius: 40,
      borderWidth: 2,
      height: 80,
      minWidth: 60,
      width: 80
    }),
    root: css({
      background: palette.white.hex,
      border: `2px solid ${borderColourDark}`,
      overflow: "hidden"
    }),
    small: css({
      borderRadius: 30,
      height: 60,
      minWidth: 60,
      width: 60
    })
  };
};

/**
 * Container for brand and profile images
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <Avatar size=-"small" />
 */
export class Avatar extends React.PureComponent<IProps> {
  public render() {
    const {
      classes,
      className,
      fade = true,
      size = "small",
      url,
      ...otherProps
    } = this.props;

    return (
      <div
        className={classnames(classes.root, classes[size], className)}
        {...otherProps}
      >
        {fade ? <ImageLoader src={url} /> : <img src={url} />}
      </div>
    );
  }
}

export default withStyles(styles)(Avatar);
