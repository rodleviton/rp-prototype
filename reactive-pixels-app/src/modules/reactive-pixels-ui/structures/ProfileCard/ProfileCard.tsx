import { Chip } from "@modules/reactive-pixels-ui/components/Chip";
import { Icon } from "@modules/reactive-pixels-ui/components/Icon";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { Avatar } from "../../components/Avatar";
import { Heading } from "../../components/Heading";
import { IBaseTheme, withStyles } from "../../theme";

interface IClasses {
  avatar: string;
  avatarWrapper: string;
  displayName: string;
  location: string;
  pin: string;
  root: string;
  user: string;
}

interface IProps {
  avatarUrl: string;
  classes: IClasses;
  className?: string;
  displayName: string;
  location: string;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { spacers } = theme.sizes;

  return {
    avatar: css({
      marginBottom: spacers.small
    }),
    avatarWrapper: css({
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      marginRight: spacers.medium
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
      display: "flex"
    }),
    user: css({
      marginBottom: spacers.medium
    })
  };
};

/**
 * ProfileCard
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <ProfileCard />
 */
export class ProfileCard extends React.PureComponent<IProps> {
  public render() {
    const {
      avatarUrl,
      children,
      className,
      classes,
      displayName,
      location,
      ...otherProps
    } = this.props;

    return (
      <div className={classnames(className, classes.root)} {...otherProps}>
        <div className={classes.avatarWrapper}>
          <Avatar
            className={classes.avatar}
            url={avatarUrl}
            size="large"
            variant="dark"
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
                skeletonWidth="60%"
              >
                {location}
              </Heading>
            </div>
          </div>

          {children}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileCard);
