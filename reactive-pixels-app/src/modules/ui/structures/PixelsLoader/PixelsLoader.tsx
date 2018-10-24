import { Loader } from "@modules/ui/components/Loader";
import { PixelsCard } from "@modules/ui/structures/PixelsCard";
import { IBaseTheme, withStyles } from "@modules/ui/theme";
import { css } from "emotion";
import * as React from "react";

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
