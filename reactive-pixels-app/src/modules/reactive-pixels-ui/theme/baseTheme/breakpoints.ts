export interface IBreakpoints {
  xs: number;
  small: number;
  medium: number;
  large: number;
  xl: number;
  xxl: number;
}

const breakpoints: IBreakpoints = {
  large: 992,
  medium: 768,
  small: 576,
  xl: 1200,
  xs: 360,
  xxl: 1680
};

export default breakpoints;
