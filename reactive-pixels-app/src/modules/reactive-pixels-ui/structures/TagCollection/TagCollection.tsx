import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { Box } from "../../components/Box";
import { Chip } from "../../components/Chip";
import { Grid } from "../../components/Grid";
import { IBaseTheme, withStyles } from "../../theme";

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
