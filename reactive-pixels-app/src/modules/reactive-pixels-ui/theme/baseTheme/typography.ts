import sizes from "./sizes";

/**
 * @description
 * We are using Lato for the Horizon State Platform font which is avalable via the Google CDN.
 * NOTE: React Native does not yet support `rem` or `em` units
 */

interface IFontVariant {
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: string;
  fontFamily?: string;
  letterSpacing?: number;
  marginBottom?: number;
  marginTop?: number;
}

interface IFontVariants {
  body1: IFontVariant;
  body2: IFontVariant;
  button: IFontVariant;
  buttonLarge: IFontVariant;
  display1: IFontVariant;
  display2: IFontVariant;
  display3: IFontVariant;
  display4: IFontVariant;
  display5: IFontVariant;
  display6: IFontVariant;
  link: IFontVariant;
  small: IFontVariant;
  subheading: IFontVariant;
}

interface IFontWeights {
  bold: "600";
  normal: "400";
}

export interface ITypography {
  fontFamilyBase: string;
  fontFamilyHeading: string;
  fontSizeBase: number;
  fontSizeExtraSmall: number;
  fontSizeSmall: number;
  fontVariants: IFontVariants;
  fontWeights: IFontWeights;
  headingLineHeight: number;
  headingMarginBottom: number;
  lineHeightBase: number;
  paragraphMarginBottom: number;
}

const fontFamilyBase = `"Open Sans", sans-serif`;
const fontFamilyHeading = fontFamilyBase;

const fontSizeBase = 16;
const fontSizeSmall = fontSizeBase * 0.875; // 14
const fontSizeExtraSmall = fontSizeBase * 0.75; // 12

const lineHeightBase = Math.round(fontSizeBase * 1.6);

const paragraphMarginBottom = sizes.spacers.medium * 0.75;
const headingMarginBottom = sizes.spacers.medium;

const fontWeights: IFontWeights = {
  bold: "600",
  normal: "400"
};

const fontVariants: IFontVariants = {
  body1: {
    fontFamily: fontFamilyBase,
    fontSize: fontSizeBase,
    letterSpacing: 0,
    lineHeight: 28,
    marginBottom: paragraphMarginBottom
  },
  body2: {
    fontFamily: fontFamilyBase,
    fontSize: fontSizeSmall,
    letterSpacing: 0,
    lineHeight: 22,
    marginBottom: paragraphMarginBottom
  },
  button: {
    fontFamily: fontFamilyBase,
    fontSize: fontSizeSmall
  },
  buttonLarge: {
    fontFamily: fontFamilyBase,
    fontSize: fontSizeBase,
    letterSpacing: 0
  },
  display1: {
    fontFamily: fontFamilyHeading,
    fontSize: 32,
    letterSpacing: 0,
    marginBottom: headingMarginBottom,
    marginTop: headingMarginBottom / 2
  },
  display2: {
    fontFamily: fontFamilyHeading,
    fontSize: 28,
    letterSpacing: 0,
    marginBottom: headingMarginBottom,
    marginTop: headingMarginBottom / 2
  },
  display3: {
    fontFamily: fontFamilyHeading,
    fontSize: 22,
    letterSpacing: 0,
    marginBottom: headingMarginBottom,
    marginTop: headingMarginBottom / 2
  },
  display4: {
    fontFamily: fontFamilyHeading,
    fontSize: 18,
    letterSpacing: 0,
    marginBottom: headingMarginBottom,
    marginTop: headingMarginBottom / 2
  },
  display5: {
    fontFamily: fontFamilyHeading,
    fontSize: 14,
    letterSpacing: 0,
    marginBottom: headingMarginBottom,
    marginTop: headingMarginBottom / 2
  },
  display6: {
    fontFamily: fontFamilyHeading,
    fontSize: 12,
    letterSpacing: 0,
    marginBottom: headingMarginBottom,
    marginTop: headingMarginBottom / 2
  },
  link: {
    fontFamily: fontFamilyBase,
    fontSize: fontSizeSmall,
    fontWeight: fontWeights.bold,
    letterSpacing: 0
  },
  small: {
    fontFamily: fontFamilyBase,
    fontSize: fontSizeExtraSmall,
    lineHeight: fontSizeExtraSmall
  },
  subheading: {
    fontFamily: fontFamilyBase,
    fontSize: fontSizeBase * 1.25, // 20px
    letterSpacing: 0,
    lineHeight: 32,
    marginBottom: paragraphMarginBottom
  }
};

export default {
  fontFamilyBase,
  fontFamilyHeading,
  fontSizeBase,
  fontSizeExtraSmall,
  fontSizeSmall,
  fontVariants,
  fontWeights,
  headingMarginBottom,
  lineHeightBase,
  paragraphMarginBottom
} as ITypography;
