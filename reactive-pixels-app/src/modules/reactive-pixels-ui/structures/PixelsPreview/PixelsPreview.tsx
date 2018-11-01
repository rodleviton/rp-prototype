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
    const { classes, className, src, to, ...otherProps } = this.props;

    return (
      <Link
        to={to}
        className={classnames(className, classes.root)}
        {...otherProps}
      >
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
    );
  }
}

export default withStyles(styles)(PixelsPreview);
