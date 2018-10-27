import { PixelsLikeButton } from "@root/containers/PixelsLikeButton";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { ImageLoader } from "../../components/ILoader";
import { Link } from "../../components/Link";
import { Loader } from "../../components/Loader";
import { IBaseTheme, withStyles } from "../../theme";
import { PixelsCard } from "../PixelsCard";

interface IClasses {
  loader: string;
  root: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
  src: string;
  to: string;
  isLikedByLoggedInUser: boolean;
  likes: string[];
  onUpdatePixelsLikesVariables: () => void;
}

const styles = (theme: IBaseTheme): IClasses => {
  return {
    loader: css({
      position: "absolute",
      zIndex: 1
    }),
    root: css({
      zIndex: 2
    })
  };
};

/**
 * ReactivePixels preview component
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <PixelsPreview />
 */
export class PixelsPreview extends React.PureComponent<IProps> {
  public render() {
    const {
      classes,
      className,
      isLikedByLoggedInUser,
      likes,
      onUpdatePixelsLikesVariables,
      src,
      to,
      ...otherProps
    } = this.props;

    return (
      <PixelsLikeButton
        onUpdatePixelsLikesVariables={onUpdatePixelsLikesVariables}
        isLikedByLoggedInUser={isLikedByLoggedInUser}
        likes={likes}
        className={classnames(className, classes.root)}
        {...otherProps}
      >
        <Link to={to}>
          <PixelsCard>
            <ImageLoader
              className={classnames(className, classes.root)}
              height={460}
              width={340}
              src={src}
            />
            <Loader className={classes.loader} />
          </PixelsCard>
        </Link>
      </PixelsLikeButton>
    );
  }
}

export default withStyles(styles)(PixelsPreview);
