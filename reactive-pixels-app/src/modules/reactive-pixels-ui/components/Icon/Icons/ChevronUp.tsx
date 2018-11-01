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

class ChevronUp extends React.PureComponent<IProps> {
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
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path
          d="M3.39304489,2.33305188 C2.86218764,1.79247217 2.87006925,0.923900898 3.41064897,0.393043651 C3.95122868,-0.137813597 4.81979995,-0.129931981 5.3506572,0.410647732 L13.0147916,8.21514811 L5.32306743,15.6166621 C4.77712668,16.1420044 3.90868017,16.1253061 3.38333787,15.5793653 C2.85799556,15.0334246 2.8746939,14.1649781 3.42063465,13.6396358 L9.11516019,8.15996574 L3.39304489,2.33305188 Z"
          fill={fillColour}
          fillRule="nonzero"
          transform="translate(8.007396, 8.000000) rotate(270.000000) translate(-8.007396, -8.000000) "
        />
      </g>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ChevronUp);
