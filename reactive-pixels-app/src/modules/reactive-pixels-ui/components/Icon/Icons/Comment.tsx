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

class Comment extends React.PureComponent<IProps> {
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
      <g strokeWidth="1" fill={fillColour}>
        <path d="M13.8181818,1.3712302 C14.2196364,1.3712302 14.5454545,1.67838577 14.5454545,2.0568453 L14.5454545,9.59861141 C14.5454545,9.97638533 14.2196364,10.2842265 13.8181818,10.2842265 L7.53381818,10.2842265 L4.36363636,12.4192319 L4.36363636,10.2842265 L2.18181818,10.2842265 C1.78036364,10.2842265 1.45454545,9.97638533 1.45454545,9.59861141 L1.45454545,2.0568453 C1.45454545,1.67838577 1.78036364,1.3712302 2.18181818,1.3712302 L13.8181818,1.3712302 M13.8181818,-3.46389584e-14 L2.18181818,-3.46389584e-14 C0.976727273,-3.46389584e-14 -4.08562073e-14,0.92078108 -4.08562073e-14,2.0568453 L-4.08562073e-14,9.59861141 C-4.08562073e-14,10.7346756 0.976727273,11.6554567 2.18181818,11.6554567 L2.90909091,11.6554567 L2.90909091,15.0835322 L8,11.6554567 L13.8181818,11.6554567 C15.0232727,11.6554567 16,10.7346756 16,9.59861141 L16,2.0568453 C16,0.92078108 15.0232727,-3.46389584e-14 13.8181818,-3.46389584e-14" />
      </g>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Comment);
