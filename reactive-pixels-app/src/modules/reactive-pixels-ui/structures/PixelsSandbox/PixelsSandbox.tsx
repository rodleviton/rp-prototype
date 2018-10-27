import { PixelsLikeButton } from "@root/containers/PixelsLikeButton";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { IframeLoader } from "../../components/IframeLoader";
import { Loader } from "../../components/Loader";
import { IBaseTheme, withStyles } from "../../theme";
import { PixelsCard } from "../PixelsCard";

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
  likes: string[];
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
      likes,
      onPixelsLike,
      src,
      ...otherProps
    } = this.props;

    return (
      <PixelsLikeButton
        onPixelsLike={onPixelsLike}
        isLikedByLoggedInUser={isLikedByLoggedInUser}
        likes={likes}
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
      </PixelsLikeButton>
    );
  }
}

export default withStyles(styles)(PixelsSandbox);
