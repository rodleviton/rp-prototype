import { Icon } from "@modules/reactive-pixels-ui/components/Icon";
import {
  SliderGutter,
  SliderPanel
} from "@modules/reactive-pixels-ui/structures/Slider";
import { IBaseTheme, withStyles } from "@modules/reactive-pixels-ui/theme";
import { DeferredRenderer } from "@root/components/DeferredRenderer";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";

interface IClasses {
  active: string;
  panel: string;
  icon: string;
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
      position: "absolute",
      right: -40
    }),
    icon: css({
      marginTop: 4
    }),
    panel: css({
      background: palette.white.hex,
      left: 0,
      position: "absolute",
      transform: "translate3d(-100%, 0, 0)",
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

class PixelsCommentsSlider extends React.PureComponent<IProps> {
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
          render={shouldRender => shouldRender && <div>Comments</div>}
        />
        <SliderGutter
          className={classes.gutter}
          active={active}
          onClick={onToggle}
        >
          <Icon.Comment className={classes.icon} colour="light" />
        </SliderGutter>
      </SliderPanel>
    );
  }
}

export default withStyles(styles)(PixelsCommentsSlider);
