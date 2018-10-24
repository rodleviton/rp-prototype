import { Box } from "@modules/ui/components/Box";
import { Chip } from "@modules/ui/components/Chip";
import { Grid } from "@modules/ui/components/Grid";
import { IBaseTheme, withStyles } from "@modules/ui/theme";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";

interface ITagCollectionClasses {
  root: string;
}

interface IProps {
  classes: ITagCollectionClasses;
  className?: string;
  tags: string[];
}

const styles = (theme: IBaseTheme): ITagCollectionClasses => {
  return {
    root: css({})
  };
};

/**
 * TagCollection
 *
 * @description
 * Container for displaying one or more tags.
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <TagCollection tags={tagsArray} />
 */
class TagCollection extends React.PureComponent<IProps> {
  public render() {
    const { children, classes, className, tags, ...otherProps } = this.props;

    return (
      <Grid
        mx={-1}
        my={2}
        className={classnames(classes.root, className)}
        {...otherProps}
      >
        {tags.map((topic: string, index: number) => (
          <Box key={index} py={2} px={1}>
            <Chip label={topic} />
          </Box>
        ))}
      </Grid>
    );
  }
}

export default withStyles(styles)(TagCollection);
