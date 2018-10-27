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

class Heart extends React.PureComponent<IProps> {
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
          d="M14,8.39687471 L8,15.0911045 L2,8.36928989 C1.2825,7.43701623 1,6.80724059 1,5.94509785 C1,4.3372297 2.2275,2.89019511 4,2.87663646 C5.458,2.86541552 7.111,4.25774799 8,5.30737405 C8.8655,4.29468361 10.542,2.87663646 12,2.87663646 C13.7255,2.87663646 15,4.3372297 15,5.94509785 C15,6.80724059 14.7765,7.48377017 14,8.39687471 L14,8.39687471 Z M12,2 C10.3335,2 9.0725,2.91450716 8,3.87015779 C6.9785,2.85606473 5.6665,2 4,2 C1.653,2 0,3.88698921 0,5.94509785 C0,7.04895849 0.4835,7.84377555 1.013,8.59090358 L7.2295,15.5600466 C7.927,16.2506023 8.059,16.2506023 8.7565,15.5600466 L14.987,8.59090358 C15.61,7.84377555 16,7.04895849 16,5.94509785 C16,3.88698921 14.347,2 12,2 L12,2 Z"
          fill={fillColour}
        />
      </g>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Heart);
