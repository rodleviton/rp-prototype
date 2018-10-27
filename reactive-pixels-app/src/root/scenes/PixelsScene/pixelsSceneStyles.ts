import { IBaseTheme } from "@modules/reactive-pixels-ui/theme";
import { css } from "emotion";

export interface IClasses {
  default: {
    active: string;
    panel: string;
  };
  code: {
    gutter: string;
    panel: string;
  };
  comments: {
    gutter: string;
    panel: string;
  };
  pixels: {
    active: string;
    commentsPanelActive: string;
    panel: string;
    codePanelActive: string;
    inactive: string;
  };
}

export const styles = (theme: IBaseTheme): IClasses => {
  const { breakpoints } = theme;
  const easing = `cubic-bezier(0.16, 0.68, 0.43, 0.99)`;
  const { palette } = theme.colours;

  return {
    code: {
      gutter: css({
        left: -40,
        position: "absolute"
      }),
      panel: css({
        right: 0,
        transform: "translate3d(100%, 0, 0)"
      })
    },

    comments: {
      gutter: css({
        position: "absolute",
        right: -40
      }),
      panel: css({
        left: 0,
        transform: "translate3d(-100%, 0, 0)"
      })
    },

    default: {
      active: css({
        transform: "translate3d(0, 0, 0) !important"
      }),
      panel: css({
        background: palette.white.hex,
        position: "absolute",
        transition:
          "transform 300ms cubic-bezier(0.16, 0.68, 0.43, 0.99), width 300ms cubic-bezier(0.16, 0.68, 0.43, 0.99)",
        width: "calc(100% - 79px)", // gutter offset + 1px border
        willChange: "transform",
        zIndex: 10,

        // >= 992
        [`@media (min-width: ${breakpoints.large}px)`]: {
          width: 500
        },
        // >= 1200
        [`@media (min-width: ${breakpoints.xl}px)`]: {
          width: 700
        },
        // >= 1680
        [`@media (min-width: ${breakpoints.xxl}px)`]: {
          width: 900
        }
      })
    },

    pixels: {
      active: css({
        width: "calc(100% - 80px)",

        // >= 992
        [`@media (min-width: ${breakpoints.large}px)`]: {
          width: "calc(100% - 580px)"
        },
        // >= 1200
        [`@media (min-width: ${breakpoints.xl}px)`]: {
          width: "calc(100% - 780px)"
        },
        // >= 1680
        [`@media (min-width: ${breakpoints.xxl}px)`]: {
          width: "calc(100% - 980px)"
        }
      }),
      codePanelActive: css({
        left: 40,
        right: 40,

        // >= 992
        [`@media (min-width: ${breakpoints.large}px)`]: {
          right: 540
        },
        // >= 1200
        [`@media (min-width: ${breakpoints.xl}px)`]: {
          right: 740
        },
        // >= 1680
        [`@media (min-width: ${breakpoints.xxl}px)`]: {
          right: 940
        }
      }),
      commentsPanelActive: css({
        left: 40,
        right: 40,

        // >= 992
        [`@media (min-width: ${breakpoints.large}px)`]: {
          left: 540
        },
        // >= 1200
        [`@media (min-width: ${breakpoints.xl}px)`]: {
          left: 740
        },
        // >= 1680
        [`@media (min-width: ${breakpoints.xxl}px)`]: {
          left: 940
        }
      }),
      inactive: css({
        left: 40,
        right: 40
      }),
      panel: css({
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        transition: `all 300ms ${easing}`,
        willChange: "transform",
        zIndex: 5
      })
    }
  };
};
