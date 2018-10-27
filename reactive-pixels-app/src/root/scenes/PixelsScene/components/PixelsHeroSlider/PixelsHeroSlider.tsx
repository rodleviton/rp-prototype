import { SliderPanel } from "@modules/reactive-pixels-ui/structures/Slider";
import { withStyles } from "@modules/reactive-pixels-ui/theme";
import { IBaseTheme } from "@modules/reactive-pixels-ui/theme";
import { PixelsHero } from "@root/containers/PixelsHero";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";
import { match, withRouter } from "react-router";

interface IClasses {
  commentsPanelActive: string;
  metaPanelActive: string;
  panel: string;
}

interface IProps {
  classes: IClasses;
  isCommentsPanelActive: boolean;
  isMetaPanelActive: boolean;
  match: match<{ id: string; username: string }>;
}

export const styles = (theme: IBaseTheme): IClasses => {
  const { breakpoints } = theme;
  const easing = `cubic-bezier(0.16, 0.68, 0.43, 0.99)`;

  const getBreakpointTransform = (offset: number) => {
    return `translate3d(calc((((100vw - ${offset}px)) - ((100vw - ${offset}px) / 2)) - 50%), 0, 0) !important`;
  };

  return {
    commentsPanelActive: css({
      [`@media (min-width: ${breakpoints.large}px)`]: {
        transform: getBreakpointTransform(-500)
      },
      [`@media (min-width: ${breakpoints.xl}px)`]: {
        transform: getBreakpointTransform(-700)
      },
      [`@media (min-width: ${breakpoints.xxl}px)`]: {
        transform: getBreakpointTransform(-900)
      }
    }),
    metaPanelActive: css({
      [`@media (min-width: ${breakpoints.large}px)`]: {
        transform: getBreakpointTransform(500)
      },
      [`@media (min-width: ${breakpoints.xl}px)`]: {
        transform: getBreakpointTransform(700)
      },
      [`@media (min-width: ${breakpoints.xxl}px)`]: {
        transform: getBreakpointTransform(900)
      }
    }),
    panel: css({
      alignItems: "center",
      justifyContent: "center",
      left: 0,
      padding: 20,
      position: "absolute",
      transform: "translate3d(calc(50vw - 50%),0,0)",
      transition: `transform 300ms ${easing}`,
      willChange: "transform",
      zIndex: 5
    })
  };
};

class PixelsHeroSlider extends React.PureComponent<IProps> {
  public render() {
    const { classes, isCommentsPanelActive, isMetaPanelActive } = this.props;

    const { id, username } = this.props.match.params;

    const heroSliderStyles = classnames(
      classes.panel,
      { [classes.metaPanelActive]: isMetaPanelActive },
      { [classes.commentsPanelActive]: isCommentsPanelActive }
    );

    return (
      <SliderPanel className={heroSliderStyles}>
        <PixelsHero pixelsId={id} username={username} />
      </SliderPanel>
    );
  }
}

export default withRouter(withStyles(styles)(PixelsHeroSlider));
