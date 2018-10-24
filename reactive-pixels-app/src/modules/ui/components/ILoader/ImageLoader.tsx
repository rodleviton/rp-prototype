import { IBaseTheme, withStyles } from "@modules/ui/theme";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";

type Status = "pending" | "loaded" | "error";

interface IClasses {
  pending: string;
  loaded: string;
  root: string;
  error: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
  src: string;
}

interface IState {
  status: Status;
}

const styles = (theme: IBaseTheme): IClasses => {
  return {
    error: css({
      opacity: 0
    }),
    loaded: css({
      opacity: 1
    }),
    pending: css({
      opacity: 0
    }),
    root: css({
      background: "transparent",
      transition: "opacity 0.3s"
    })
  };
};

/**
 * ImageLoader
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <ImageLoader />
 */
class ImageLoader extends React.PureComponent<IProps, IState> {
  public readonly state: IState = {
    status: "pending"
  };

  public handleImageLoaded = () => {
    this.setState({
      status: "loaded"
    });
  };

  public render() {
    const { classes, className, src, ...otherProps } = this.props;
    const { status } = this.state;

    return (
      <img
        className={classnames(classes.root, classes[status], className)}
        src={src}
        onLoad={this.handleImageLoaded}
        {...otherProps}
      />
    );
  }
}

export default withStyles(styles)(ImageLoader);
