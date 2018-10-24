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

class Success extends React.PureComponent<IProps> {
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
        <circle fill={fillColour} cx="8" cy="8" r="4.03529412" />
        <path
          d="M9.64046081,7.30427649 L7.6307558,9.30616163 C7.56819689,9.36872054 7.48999825,9.4 7.41179962,9.4 C7.33360098,9.4 7.24758248,9.36872054 7.19284343,9.30616163 L6.19972072,8.32085879 C6.0746029,8.19574097 6.0746029,8.00024437 6.19972072,7.87512655 C6.32483854,7.75000873 6.52033514,7.75000873 6.64545296,7.87512655 L7.41179962,8.64147321 L9.19472857,6.85854425 C9.3198464,6.73342643 9.51534299,6.73342643 9.64046081,6.85854425 C9.75775877,6.98366207 9.75775877,7.18697853 9.64046081,7.30427649"
          fill="#FFFFFF"
        />
        <path
          d="M8,13.2705882 C5.0891345,13.2705882 2.72941176,10.9108655 2.72941176,8 C2.72941176,5.0891345 5.0891345,2.72941176 8,2.72941176 C10.9108655,2.72941176 13.2705882,5.0891345 13.2705882,8 C13.2705882,10.9108655 10.9108655,13.2705882 8,13.2705882 Z M8,13.1058824 C10.819901,13.1058824 13.1058824,10.819901 13.1058824,8 C13.1058824,5.18009904 10.819901,2.89411765 8,2.89411765 C5.18009904,2.89411765 2.89411765,5.18009904 2.89411765,8 C2.89411765,10.819901 5.18009904,13.1058824 8,13.1058824 Z"
          fillOpacity="0.35"
          fill={fillColour}
        />
        <path
          d="M8,15.0823529 C4.08852448,15.0823529 0.917647059,11.9114755 0.917647059,8 C0.917647059,4.08852448 4.08852448,0.917647059 8,0.917647059 C11.9114755,0.917647059 15.0823529,4.08852448 15.0823529,8 C15.0823529,11.9114755 11.9114755,15.0823529 8,15.0823529 Z M8,14.9176471 C11.820511,14.9176471 14.9176471,11.820511 14.9176471,8 C14.9176471,4.17948902 11.820511,1.08235294 8,1.08235294 C4.17948902,1.08235294 1.08235294,4.17948902 1.08235294,8 C1.08235294,11.820511 4.17948902,14.9176471 8,14.9176471 Z"
          fillOpacity="0.09"
          fill={fillColour}
        />
      </g>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Success);
