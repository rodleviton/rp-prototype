import {
  breakpoints,
  colours,
  IBaseTheme,
  sizes,
  typography
} from "./baseTheme";

export interface IThemeOverrides {
  colours?: {
    primary?: string;
  };
}

const createTheme = (themeOverrides?: IThemeOverrides): IBaseTheme => {
  return { breakpoints, colours, sizes, typography };
};

export default createTheme;
