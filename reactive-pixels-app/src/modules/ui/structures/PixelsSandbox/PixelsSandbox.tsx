import { IframeLoader } from "@modules/ui/components/IframeLoader";
import { Loader } from "@modules/ui/components/Loader";
import { PixelsCard } from "@modules/ui/structures/PixelsCard";
import { PixelsContainer } from "@modules/ui/structures/PixelsContainer";
import { IBaseTheme, withStyles } from "@modules/ui/theme";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";

interface IClasses {
  card: string;
  iframe: string;
  loader: string;
  root: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
  src: string | null;
  isLikedByLoggedInUser: boolean;
  numberOfLikes: number;
  onPixelsLike: () => void;
}

const styles = (theme: IBaseTheme): IClasses => {
  return {
    card: css({}),
    iframe: css({
      zIndex: 2
    }),
    loader: css({
      position: "absolute",
      zIndex: 1
    }),
    root: css({})
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
    const {
      classes,
      className,
      isLikedByLoggedInUser,
      onPixelsLike,
      numberOfLikes,
      src,
      ...otherProps
    } = this.props;

    return (
      <PixelsContainer
        onPixelsLike={onPixelsLike}
        isLikedByLoggedInUser={isLikedByLoggedInUser}
        numberOfLikes={numberOfLikes}
        className={classnames(className, classes.root)}
        {...otherProps}
      >
        <PixelsCard className={classes.card}>
          <IframeLoader
            className={classes.iframe}
            height={460}
            width={340}
            src={src}
          />
          <Loader className={classes.loader} />
        </PixelsCard>
      </PixelsContainer>
    );
  }
}

export default withStyles(styles)(PixelsSandbox);
