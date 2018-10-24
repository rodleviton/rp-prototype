import { IBaseTheme, withStyles } from "@modules/ui/theme";
import { css } from "emotion";
import * as React from "react";

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

class ChevronLeft extends React.PureComponent<IProps> {
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
          d="M2.23594836,7.43111111 C1.92135055,7.75111111 1.92135055,8.26666667 2.23594836,8.56888889 L9.27944389,15.7333333 C9.62899702,16.0888889 10.188282,16.0888889 10.5378352,15.7333333 C10.8873883,15.3777778 10.8873883,14.8088889 10.5378352,14.4533333 L4.75273088,8.56888889 C4.43813307,8.24888889 4.43813307,7.73333333 4.75273088,7.43111111 L10.5378352,1.54666667 C10.8873883,1.19111111 10.8873883,0.622222222 10.5378352,0.266666667 C10.188282,-0.0888888889 9.62899702,-0.0888888889 9.27944389,0.266666667 L2.23594836,7.43111111 Z"
          fill={fillColour}
          fillRule="nonzero"
          transform="translate(6.400000, 8.000000) rotate(-360.000000) translate(-6.400000, -8.000000) "
        />
      </g>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ChevronLeft);
