import { Chip } from "@modules/reactive-pixels-ui/components/Chip";
import { Icon } from "@modules/reactive-pixels-ui/components/Icon";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { AppBar } from "../../components/AppBar";
import { Avatar } from "../../components/Avatar";
import { Button } from "../../components/Button";
import { Heading } from "../../components/Heading";
import { IBaseTheme, withStyles } from "../../theme";

interface IClasses {
  appBar: string;
  avatar: string;
  avatarWrapper: string;
  content: string;
  displayName: string;
  location: string;
  pin: string;
  root: string;
  stat: string;
  user: string;
}

interface IProps {
  avatarUrl: string;
  classes: IClasses;
  className?: string;
  displayName: string;
  location: string;
  numberOfFollowers: number;
  numberOfFollowing: number;
  numberOfPixels: number;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { borderColour, palette } = theme.colours;
  const { spacers } = theme.sizes;
  const { fontVariants, fontWeights } = theme.typography;

  return {
    appBar: css({
      height: 60,
      marginTop: spacers.medium
    }),
    avatar: css({
      marginBottom: spacers.small
    }),
    avatarWrapper: css({
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      marginRight: spacers.medium
    }),
    content: css({
      display: "flex"
    }),
    displayName: css({
      textTransform: "uppercase"
    }),
    location: css({
      display: "flex"
    }),
    pin: css({
      transform: "scale(0.75)"
    }),
    root: css({
      alignItems: "center",
      background: palette.white.hex,
      borderBottom: `1px solid ${borderColour}`,
      display: "flex",
      justifyContent: "center",
      paddingBottom: spacers.large,
      paddingTop: spacers.large,
      position: "relative",
      width: "100%"
    }),
    stat: css({
      margin: "0 10px",
      ["> span"]: {
        ...fontVariants.display3,
        color: palette.grey3.hex,
        fontWeight: fontWeights.extraBold
      }
    }),
    user: css({
      marginBottom: spacers.medium
    })
  };
};

/**
 * ProfileMasthead
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <ProfileMasthead />
 */
export class ProfileMasthead extends React.PureComponent<IProps> {
  public render() {
    const {
      avatarUrl,
      className,
      classes,
      displayName,
      location,
      numberOfFollowers,
      numberOfFollowing,
      numberOfPixels,
      ...otherProps
    } = this.props;

    return (
      <header className={classnames(className, classes.root)} {...otherProps}>
        <div className={classes.content}>
          <div className={classes.avatarWrapper}>
            <Avatar
              className={classes.avatar}
              url={avatarUrl}
              size="large"
              variant="dark"
              skeleton={true}
            />
            <Chip label="PRO" />
          </div>
          <div>
            <div className={classes.user}>
              <Heading
                fontWeight="bold"
                colour="dark"
                variant="display3"
                margin={false}
                className={classes.displayName}
                skeleton={true}
              >
                {displayName}
              </Heading>
              <div className={classes.location}>
                <Icon.Pin className={classes.pin} />

                <Heading
                  variant="display6"
                  colour="dark"
                  margin={false}
                  skeleton={true}
                >
                  {location}
                </Heading>
              </div>
            </div>
            <Button variant="primary">Following</Button>

            <AppBar className={classes.appBar}>
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
          </div>
        </div>
      </header>
    );
  }
}

export default withStyles(styles)(ProfileMasthead);
