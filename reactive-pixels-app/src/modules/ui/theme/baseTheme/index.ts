import { IBreakpoints } from './breakpoints';
import { IColours } from './colours';
import { ISizes } from './sizes';
import { ITypography } from './typography';

export interface IBaseTheme {
  breakpoints: IBreakpoints;
  colours: IColours;
  typography: ITypography;
  sizes: ISizes;
}

export { default as breakpoints } from './breakpoints';
export { default as colours } from './colours';
export { default as typography } from './typography';
export { default as sizes } from './sizes';
