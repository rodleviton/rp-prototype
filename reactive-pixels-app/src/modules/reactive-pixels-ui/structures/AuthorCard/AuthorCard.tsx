import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { Avatar } from "../../components/Avatar";
import { Box } from "../../components/Box";
import { Link } from "../../components/Link";
import { IBaseTheme, withStyles } from "../../theme";

interface IClasses {
  root: string;
  subheading: string;
  details: string;
  name: string;
}

interface IProps {
  avatar: string;
  classes: IClasses;
  className?: string;
  name: string;
  url: string;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { palette } = theme.colours;
  const { spacers } = theme.sizes;
  const { fontSizeExtraSmall } = theme.typography;

  return {
    details: css({
      marginLeft: spacers.small
    }),
    name: css({
      color: palette.grey1.hex,
      fontSize: fontSizeExtraSmall,
      textTransform: "uppercase"
    }),
    root: css({
      alignItems: "center",
      display: "flex",
      marginBottom: spacers.medium,
      textDecoration: "none"
    }),
    subheading: css({
      color: palette.grey3.hex,
      fontSize: 10,
      textTransform: "uppercase"
    })
  };
};

/**
 * AuthorCard
 * @description
 * Pixels author card display
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <AuthorCard name="Rod Leviton" avatar="images/avatar.jpg" />
 */
export class AuthorCard extends React.PureComponent<IProps> {
  public render() {
    const {
      avatar = "",
      classes,
      className,
      name = "",
      url = "",
      ...otherProps
    } = this.props;

    return (
      <Link
        to={url}
        className={classnames(classes.root, className)}
        {...otherProps}
      >
        <Avatar url={avatar} size="small" />

        <Box className={classes.details}>
          <Box className={classes.subheading}>Created By</Box>
          <Box className={classes.name}>{name}</Box>
        </Box>
      </Link>
    );
  }
}

export default withStyles(styles)(AuthorCard);
