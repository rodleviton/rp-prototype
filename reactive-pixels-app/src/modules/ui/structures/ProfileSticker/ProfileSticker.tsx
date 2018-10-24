import { Avatar } from "@modules/ui/components/Avatar";
import { Box } from "@modules/ui/components/Box";
import { Link } from "@modules/ui/components/Link";
import { IBaseTheme, withStyles } from "@modules/ui/theme";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";

type Alignment = "left" | "right";

interface IClasses {
  alignment: {
    left: {
      root: string;
      details: string;
    };
    right: {
      root: string;
      details: string;
    };
  };
  name: string;
  root: string;
  subheading: string;
}

interface IProps {
  avatar: string;
  classes: IClasses;
  className?: string;
  compact?: boolean;
  name: string;
  url: string;
  align: Alignment;
  subheading?: string;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { palette } = theme.colours;
  const { spacers } = theme.sizes;
  const { fontSizeExtraSmall } = theme.typography;

  return {
    alignment: {
      left: {
        details: css({
          marginLeft: spacers.small
        }),
        root: css({})
      },
      right: {
        details: css({
          marginRight: spacers.small
        }),
        root: css({
          flexDirection: "row-reverse"
        })
      }
    },
    name: css({
      color: palette.grey1.hex,
      fontSize: fontSizeExtraSmall,
      textTransform: "uppercase"
    }),
    root: css({
      alignItems: "center",
      display: "flex",
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
 * ProfileSticker
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <ProfileSticker />
 */
export class ProfileSticker extends React.PureComponent<IProps> {
  public render() {
    const {
      avatar = "",
      classes,
      className,
      compact = false,
      align = "left",
      name = "...",
      subheading,
      url = "",
      ...otherProps
    } = this.props;

    return (
      <Link
        to={url}
        className={classnames(
          classes.root,
          classes.alignment[align].root,
          className
        )}
        {...otherProps}
      >
        <Avatar url={avatar} size="small" />

        {!compact && (
          <Box className={classes.alignment[align].details}>
            {subheading && (
              <Box className={classes.subheading}>{subheading}</Box>
            )}
            <Box className={classes.name}>{name}</Box>
          </Box>
        )}
      </Link>
    );
  }
}

export default withStyles(styles)(ProfileSticker);
