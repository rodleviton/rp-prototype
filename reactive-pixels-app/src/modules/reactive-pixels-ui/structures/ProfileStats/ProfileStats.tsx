import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { AppBar } from "../../components/AppBar";
import { IBaseTheme, withStyles } from "../../theme";

interface IClasses {
  root: string;
  stat: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
  numberOfFollowers: number;
  numberOfFollowing: number;
  numberOfPixels: number;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { palette } = theme.colours;
  const { spacers } = theme.sizes;
  const { fontVariants, fontWeights } = theme.typography;

  return {
    root: css({
      height: 60,
      marginTop: spacers.medium
    }),
    stat: css({
      margin: "0 10px",
      ["> span"]: {
        ...fontVariants.display3,
        color: palette.grey3.hex,
        fontWeight: fontWeights.extraBold
      }
    })
  };
};

/**
 * ProfileStats
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <ProfileStats />
 */
export class ProfileStats extends React.PureComponent<IProps> {
  public render() {
    const {
      className,
      classes,
      numberOfFollowers,
      numberOfFollowing,
      numberOfPixels,
      ...otherProps
    } = this.props;

    return (
      <AppBar className={classnames(className, classes.root)} {...otherProps}>
        <div className={classes.stat}>
          <span>{numberOfPixels}</span> Pixels
        </div>
        <div className={classes.stat}>
          <span>{numberOfFollowing}</span> Following
        </div>
        <div className={classes.stat}>
          <span>{numberOfFollowers}</span> Followers
        </div>
      </AppBar>
    );
  }
}

export default withStyles(styles)(ProfileStats);
