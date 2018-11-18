import { Heading } from "@modules/reactive-pixels-ui/components/Heading";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { Avatar } from "../../components/Avatar";
import { Box } from "../../components/Box";
import { Link } from "../../components/Link";
import { IBaseTheme, withStyles } from "../../theme";

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
      name = "",
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
            <Heading
              skeleton={true}
              skeletonWidth="100px"
              className={classes.name}
              variant="display6"
              margin={false}
            >
              {name}
            </Heading>
          </Box>
        )}
      </Link>
    );
  }
}

export default withStyles(styles)(ProfileSticker);
