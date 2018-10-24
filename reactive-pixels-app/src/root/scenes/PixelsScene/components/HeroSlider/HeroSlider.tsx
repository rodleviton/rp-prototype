import { SliderPanel } from "@modules/ui/structures/Slider";
import { withStyles } from "@modules/ui/theme";
import { IBaseTheme } from "@modules/ui/theme";
import { PixelsHero } from "@root/components/PixelsHero";
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
      // >= 992
      [`@media (min-width: ${breakpoints.large}px)`]: {
        transform: getBreakpointTransform(-500)
      },
      // >= 1200
      [`@media (min-width: ${breakpoints.xl}px)`]: {
        transform: getBreakpointTransform(-700)
      },
      // >= 1680
      [`@media (min-width: ${breakpoints.xxl}px)`]: {
        transform: getBreakpointTransform(-900)
      }
    }),
    metaPanelActive: css({
      // >= 992
      [`@media (min-width: ${breakpoints.large}px)`]: {
        transform: getBreakpointTransform(500)
      },
      // >= 1200
      [`@media (min-width: ${breakpoints.xl}px)`]: {
        transform: getBreakpointTransform(700)
      },
      // >= 1680
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

class HeroSlider extends React.PureComponent<IProps> {
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

export default withRouter(withStyles(styles)(HeroSlider));
