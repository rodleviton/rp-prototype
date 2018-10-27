import { css } from "emotion";
import * as React from "react";
import { IBaseTheme, withStyles } from "../../../theme";

type Colour = "light" | "dark" | "primary";

export interface IClasses {
  root: string;
}

export interface IProps {
  classes: IClasses;
  theme: IBaseTheme;
  colour?: Colour;
}

const styles = (theme: IBaseTheme): IClasses => {
  return {
    root: css({})
  };
};

class Cross extends React.PureComponent<IProps> {
  public render() {
    const { colour = "dark", theme } = this.props;
    const { textColourDark, textColourLight } = theme.colours;
    const { primary } = theme.colours.palette;

    const fillColour =
      colour === "dark"
        ? textColourDark
        : colour === "primary"
          ? primary.hex
          : textColourLight;

    return (
      <g strokeWidth={2}>
        <line x1="0" y1="0" x2="16" y2="16" stroke={fillColour} />
        <line x1="0" y1="16" x2="16" y2="0" stroke={fillColour} />
      </g>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Cross);
