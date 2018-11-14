interface IColour {
  name: string;
  hex: string;
}

interface IPalette {
  black: IColour;
  grey1: IColour;
  grey2: IColour;
  grey3: IColour;
  grey4: IColour;
  grey5: IColour;
  grey6: IColour;
  primary: IColour;
  white: IColour;
}

export interface IColours {
  backgroundColour: string;
  borderColour: string;
  borderColourDark: string;
  headingColourDark: string;
  headingColourLight: string;
  linkColour: string;
  palette: IPalette;
  textColourDark: string;
  textColourLight: string;
}

// ReactivePixels Colour Palette
const baseColours = {
  amber: "#ffbd00",
  black: "#000000",
  charcoal: "#252527",
  darkGrey: "#828282",
  grey: "#E6E6E6",
  lightGrey: "#F7F7F7",
  lineGrey: "#9C9CA0",
  midGrey: "#727276",
  white: "#FFFFFF"
};

const palette: IPalette = {
  black: {
    hex: baseColours.black,
    name: "B1 - Black"
  },
  grey1: {
    hex: baseColours.charcoal,
    name: "G1 - Charcoal (Primary)"
  },
  grey2: {
    hex: baseColours.darkGrey,
    name: "G2 - Dark Grey"
  },
  grey3: {
    hex: baseColours.midGrey,
    name: "G3 - Mid Grey"
  },
  grey4: {
    hex: baseColours.lineGrey,
    name: "G4 - Line Grey"
  },
  grey5: {
    hex: baseColours.grey,
    name: "G5 - Grey"
  },
  grey6: {
    hex: baseColours.lightGrey,
    name: "G6 - Light Grey"
  },
  primary: {
    hex: baseColours.amber,
    name: "Amber"
  },
  white: {
    hex: baseColours.white,
    name: "W1 - White"
  }
};

const backgroundColour = baseColours.white;
const borderColour = baseColours.grey;
const borderColourDark = baseColours.darkGrey;
const linkColour = baseColours.black;
const headingColourDark = baseColours.charcoal;
const headingColourLight = baseColours.white;
const textColourDark = baseColours.midGrey;
const textColourLight = baseColours.white;

export default {
  backgroundColour,
  borderColour,
  borderColourDark,
  headingColourDark,
  headingColourLight,
  linkColour,
  palette,
  textColourDark,
  textColourLight
} as IColours;
