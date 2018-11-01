import { css } from "emotion";
import * as React from "react";
import { IframeLoader } from "../../components/IframeLoader";
import { Loader } from "../../components/Loader";
import { IBaseTheme, withStyles } from "../../theme";
import { PixelsCard } from "../PixelsCard";

interface IClasses {
  iframe: string;
  loader: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
  src: string | null;
}

const styles = (theme: IBaseTheme): IClasses => {
  return {
    iframe: css({
      zIndex: 2
    }),
    loader: css({
      position: "absolute",
      zIndex: 1
    })
  };
};

/**
 * ReactivePixels sandbox component
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <PixelsSandbox />
 */
export class PixelsSandbox extends React.PureComponent<IProps> {
  public render() {
    const { classes, className, src, ...otherProps } = this.props;

    return (
      <PixelsCard {...otherProps}>
        <IframeLoader
          className={classes.iframe}
          height={460}
          width={340}
          src={src}
        />
        <Loader className={classes.loader} />
      </PixelsCard>
    );
  }
}

export default withStyles(styles)(PixelsSandbox);
