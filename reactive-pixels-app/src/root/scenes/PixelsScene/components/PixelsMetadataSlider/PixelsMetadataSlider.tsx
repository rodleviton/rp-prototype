import { Icon } from "@modules/reactive-pixels-ui/components/Icon";
import {
  SliderGutter,
  SliderPanel
} from "@modules/reactive-pixels-ui/structures/Slider";
import { IBaseTheme, withStyles } from "@modules/reactive-pixels-ui/theme";
import { DeferredRenderer } from "@root/components/DeferredRenderer";
import { PixelsMetadata } from "@root/containers/PixelsMetadata";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";

interface IClasses {
  active: string;
  panel: string;
  gutter: string;
}

interface IProps {
  active: boolean;
  classes: IClasses;
  onToggle: () => any;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { breakpoints } = theme;
  const { palette } = theme.colours;
  const easing = `cubic-bezier(0.16, 0.68, 0.43, 0.99)`;

  return {
    active: css({
      transform: "translate3d(0, 0, 0) !important"
    }),
    gutter: css({
      left: -40,
      position: "absolute"
    }),
    panel: css({
      background: palette.white.hex,
      position: "absolute",
      right: 0,
      transform: "translate3d(100%, 0, 0)",
      transition: `all 300ms ${easing}`,
      width: "calc(100% - 79px)", // gutter offset + 1px border
      willChange: "transform",
      zIndex: 10,
      [`@media (min-width: ${breakpoints.large}px)`]: {
        width: 500
      },
      [`@media (min-width: ${breakpoints.xl}px)`]: {
        width: 700
      },
      [`@media (min-width: ${breakpoints.xxl}px)`]: {
        width: 900
      }
    })
  };
};

class PixelsMetadataSlider extends React.PureComponent<IProps> {
  public render() {
    const { active, classes, onToggle } = this.props;

    return (
      <SliderPanel
        className={classnames(classes.panel, {
          [classes.active]: active
        })}
      >
        <DeferredRenderer
          condition={active}
          render={shouldRender => shouldRender && <PixelsMetadata />}
        />

        <SliderGutter
          className={classes.gutter}
          active={active}
          onClick={onToggle}
        >
          <Icon.Code colour={active ? "light" : "dark"} />
        </SliderGutter>
      </SliderPanel>
    );
  }
}

export default withStyles(styles)(PixelsMetadataSlider);
