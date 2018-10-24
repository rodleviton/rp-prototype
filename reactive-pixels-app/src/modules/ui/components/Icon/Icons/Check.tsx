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

class Check extends React.PureComponent<IProps> {
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
          d="M15.6114409,4.38316244 L6.73502428,13.2250405 C6.4587156,13.5013492 6.11332974,13.6395035 5.76794387,13.6395035 C5.42255801,13.6395035 5.04263357,13.5013492 4.80086346,13.2250405 L0.414463033,8.87317863 C-0.138154344,8.32056125 -0.138154344,7.4570966 0.414463033,6.90447922 C0.96708041,6.35186185 1.83054506,6.35186185 2.38316244,6.90447922 L5.76794387,10.2892607 L13.6427415,2.41446303 C14.1953589,1.86184566 15.0588235,1.86184566 15.6114409,2.41446303 C16.1295197,2.96708041 16.1295197,3.86508365 15.6114409,4.38316244"
          fill={fillColour}
          fillRule="nonzero"
        />
      </g>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Check);
