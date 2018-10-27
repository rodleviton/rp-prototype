interface IBorderRadius {
  large: number;
  medium: number;
  small: number;
}

interface ISpacers {
  base: number;
  large: number;
  medium: number;
  small: number;
}
export interface ISizes {
  borderRadius: IBorderRadius;
  spacers: ISpacers;
}

const borderRadius: IBorderRadius = {
  large: 6,
  medium: 3,
  small: 2,
};

const spacers: ISpacers = {
  base: 5,
  large: 40,
  medium: 20,
  small: 10,
};

export default {
  borderRadius,
  spacers,
} as ISizes;
