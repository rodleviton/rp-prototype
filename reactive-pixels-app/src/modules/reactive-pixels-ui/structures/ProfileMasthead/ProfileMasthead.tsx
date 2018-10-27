import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { AppBar } from "../../components/AppBar";
import { Avatar } from "../../components/Avatar";
import { Heading } from "../../components/Heading";
import { IBaseTheme, withStyles } from "../../theme";

interface IClasses {
  appBar: string;
  displayName: string;
  root: string;
}

interface IProps {
  avatarUrl: string;
  classes: IClasses;
  className?: string;
  displayName: string;
  location: string;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { palette } = theme.colours;

  return {
    appBar: css({
      bottom: -60,
      height: 60,
      justifyContent: "center",
      position: "absolute"
    }),
    displayName: css({
      textTransform: "uppercase"
    }),
    root: css({
      alignItems: "center",
      background: `url(/masthead-bg.jpg) ${palette.white.hex}`,
      backgroundSize: "cover",
      display: "flex",
      flexDirection: "column",
      height: 200,
      justifyContent: "center",
      marginBottom: 60,
      position: "relative",
      width: "100%"
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
      ...otherProps
    } = this.props;

    return (
      <header className={classnames(className, classes.root)} {...otherProps}>
        <Heading
          fontWeight="bold"
          colour="light"
          variant="display3"
          margin={false}
          center={true}
          className={classes.displayName}
        >
          {displayName}
        </Heading>
        <Heading variant="display6" colour="light" margin={false} center={true}>
          {location}
        </Heading>

        <AppBar className={classes.appBar}>
          <Avatar url={avatarUrl} size="large" />
        </AppBar>
      </header>
    );
  }
}

export default withStyles(styles)(ProfileMasthead);
