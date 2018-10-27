import { css } from "emotion";
import * as React from "react";
import { Loader } from "../../components/Loader";
import { IBaseTheme, withStyles } from "../../theme";
import { PixelsCard } from "../PixelsCard";

interface IClasses {
  root: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
}

const styles = (theme: IBaseTheme): IClasses => {
  return {
    root: css({})
  };
};

/**
 * PixelsLoader
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <PixelsLoader />
 */
export class PixelsLoader extends React.PureComponent<IProps> {
  public render() {
    const { className, ...otherProps } = this.props;

    return (
      <PixelsCard {...otherProps}>
        <Loader />
      </PixelsCard>
    );
  }
}

export default withStyles(styles)(PixelsLoader);
