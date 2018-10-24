import { ImageLoader } from "@modules/ui/components/ILoader";
import { Link } from "@modules/ui/components/Link";
import { Loader } from "@modules/ui/components/Loader";
import { PixelsCard } from "@modules/ui/structures/PixelsCard";
import { PixelsContainer } from "@modules/ui/structures/PixelsContainer";
import { IBaseTheme, withStyles } from "@modules/ui/theme";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";

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
  numberOfLikes: number;
  onPixelsLike: () => void;
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
      numberOfLikes,
      onPixelsLike,
      src,
      to,
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
      </PixelsContainer>
    );
  }
}

export default withStyles(styles)(PixelsPreview);
