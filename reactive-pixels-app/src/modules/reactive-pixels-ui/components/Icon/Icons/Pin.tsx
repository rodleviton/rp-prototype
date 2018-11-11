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

class Pin extends React.PureComponent<IProps> {
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
          d="M3.67857143,1.64285714 C4.79762464,0.547613571 6.14284929,0 7.71428571,0 C9.28572214,0 10.6309468,0.547613571 11.75,1.64285714 C12.8690532,2.73810071 13.4285714,4.05951607 13.4285714,5.60714286 C13.4285714,6.84524429 12.9523857,8.33332464 12,10.0714286 C11.0476143,11.8095325 10.0952429,13.2380896 9.14285714,14.3571429 L7.71428571,16 C7.54761821,15.8333325 7.33928696,15.601192 7.08928571,15.3035714 C6.83928446,15.0059509 6.38690804,14.4285757 5.73214286,13.5714286 C5.07737768,12.7142814 4.5000025,11.8809564 4,11.0714286 C3.4999975,10.2619007 3.04166875,9.34524321 2.625,8.32142857 C2.20833125,7.29761393 2,6.39286107 2,5.60714286 C2,4.05951607 2.55951821,2.73810071 3.67857143,1.64285714 Z M6.25,7.03571429 C6.65476393,7.41666857 7.14285429,7.60714286 7.71428571,7.60714286 C8.28571714,7.60714286 8.76785518,7.41071625 9.16071429,7.01785714 C9.55357339,6.62499804 9.75,6.15476464 9.75,5.60714286 C9.75,5.05952107 9.55357339,4.58928768 9.16071429,4.19642857 C8.76785518,3.80356946 8.28571714,3.60714286 7.71428571,3.60714286 C7.14285429,3.60714286 6.66071625,3.80356946 6.26785714,4.19642857 C5.87499804,4.58928768 5.67857143,5.05952107 5.67857143,5.60714286 C5.67857143,6.15476464 5.86904571,6.63095036 6.25,7.03571429 Z"
          fill={fillColour}
        />
      </g>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Pin);
