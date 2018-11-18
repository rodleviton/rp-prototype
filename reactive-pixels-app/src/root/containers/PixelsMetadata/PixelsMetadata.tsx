import { IBaseTheme, withStyles } from "@modules/reactive-pixels-ui/theme";
import { css } from "emotion";
import * as React from "react";

interface IClasses {
  root: string;
}

interface IProps {
  classes: IClasses;
}

const styles = (theme: IBaseTheme): IClasses => {
  return {
    root: css({
      background: "#000",
      width: "100%"
    })
  };
};

class PixelsMeta extends React.PureComponent<IProps> {
  public render() {
    const { classes } = this.props;

    return <div className={classes.root}>Pixels Meta</div>;
  }
}

export default withStyles(styles)(PixelsMeta);
