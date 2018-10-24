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

class Clock extends React.PureComponent<IProps> {
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
          d="M7.99998093,0.250032783 C9.39581109,0.250032783 10.6874745,0.598990443 11.8749717,1.29690529 C13.0624689,1.99482013 14.0051751,2.93752638 14.7030899,4.12502354 C15.4010048,5.31252071 15.7499624,6.60418414 15.7499624,8.00001431 C15.7499624,9.39584447 15.4010048,10.6875079 14.7030899,11.8750051 C14.0051751,13.0625022 13.0624689,14.0052085 11.8749717,14.7031233 C10.6874745,15.4010382 9.39581109,15.7499958 7.99998093,15.7499958 C6.60415076,15.7499958 5.31248733,15.4010382 4.12499017,14.7031233 C2.937493,14.0052085 1.99478675,13.0625022 1.29687191,11.8750051 C0.598957064,10.6875079 0.249999404,9.39584447 0.249999404,8.00001431 C0.249999404,6.60418414 0.598957064,5.31252071 1.29687191,4.12502354 C1.99478675,2.93752638 2.937493,1.99482013 4.12499017,1.29690529 C5.31248733,0.598990443 6.60415076,0.250032783 7.99998093,0.250032783 Z M7.99998093,14.2499994 C9.12497824,14.2499994 10.1666423,13.9687501 11.1249735,13.4062514 C12.0833047,12.8437528 12.8437194,12.0833381 13.406218,11.1250069 C13.9687167,10.1666756 14.249966,9.12501162 14.249966,8.00001431 C14.249966,6.87501699 13.9687167,5.83335296 13.406218,4.87502176 C12.8437194,3.91669055 12.0833047,3.15627585 11.1249735,2.59377719 C10.1666423,2.03127854 9.12497824,1.75002921 7.99998093,1.75002921 C6.87498361,1.75002921 5.83331958,2.03127854 4.87498838,2.59377719 C3.91665717,3.15627585 3.15624247,3.91669055 2.59374382,4.87502176 C2.03124516,5.83335296 1.74999583,6.87501699 1.74999583,8.00001431 C1.74999583,9.12501162 2.03124516,10.1666756 2.59374382,11.1250069 C3.15624247,12.0833381 3.91665717,12.8437528 4.87498838,13.4062514 C5.83331958,13.9687501 6.87498361,14.2499994 7.99998093,14.2499994 Z M7.28123264,9.06251177 C7.17706638,8.97917848 7.12498301,8.87501222 7.12498301,8.75001252 L7.12498301,3.62502474 C7.12498301,3.52085848 7.16144142,3.4323167 7.23435775,3.35940037 C7.30727409,3.28648404 7.39581586,3.25002563 7.49998212,3.25002563 L8.49997973,3.25002563 C8.60414599,3.25002563 8.69268777,3.28648404 8.7656041,3.35940037 C8.83852043,3.4323167 8.87497884,3.52085848 8.87497884,3.62502474 L8.87497884,8.06251416 L10.9687238,9.56251058 C11.0520571,9.62501043 11.098932,9.70834372 11.1093485,9.81250998 C11.119765,9.91667624 11.0937236,10.010426 11.0312237,10.0937593 L10.468725,10.9062574 C10.4062252,10.9895907 10.3228919,11.0416736 10.2187256,11.062507 C10.1145594,11.0833404 10.0208096,11.062507 9.93747631,11.0000072 L7.28123264,9.06251177 Z"
          fill={fillColour}
        />
      </g>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Clock);