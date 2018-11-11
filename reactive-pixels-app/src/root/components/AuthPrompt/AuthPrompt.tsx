import { GithubStrategy } from "@modules/auth/components/GithubStrategy";
import { SocialAuth } from "@modules/auth/components/SocialAuth";
import { Heading } from "@modules/reactive-pixels-ui/components/Heading";
import { ImageLoader } from "@modules/reactive-pixels-ui/components/ILoader";
import { Logo } from "@modules/reactive-pixels-ui/components/Logo";
import { LoginButton } from "@modules/reactive-pixels-ui/structures/LoginButton";
import { IBaseTheme, withStyles } from "@modules/reactive-pixels-ui/theme";
import classnames from "classnames";
import { css } from "emotion";
import Parallax from "parallax-js";
import * as React from "react";
interface IClasses {
  emphasise: string;
  headline: string;
  hero: string;
  layer: string;
  root: string;
  stars: any;
  wrapper: string;
}

interface IProps {
  classes: IClasses;
  className?: string;
  onClose: () => any;
}

const styles = (theme: IBaseTheme): IClasses => {
  const { borderColour, palette } = theme.colours;
  const { spacers } = theme.sizes;

  return {
    emphasise: css({
      color: palette.primary.hex,
      fontStyle: "normal"
    }),
    headline: css({
      marginBottom: `${spacers.large}px !important`,
      maxWidth: 400
    }),
    hero: css({
      borderRadius: 165,
      height: 330,
      marginBottom: spacers.medium,
      marginTop: spacers.medium,
      overflow: "hidden",
      padding: 10,
      width: 330
    }),
    layer: css({
      height: 330,
      marginLeft: -20,
      marginTop: -20,
      width: 330,

      ["& > img"]: {
        height: 360,
        maxWidth: 360,
        width: 660
      }
    }),
    root: css({
      alignItems: "center",
      display: "flex",
      flexDirection: "column"
    }),
    stars: css({
      animation: "stars 3s linear infinite",
      animationDirection: "alternate",
      ["@keyframes stars"]: {
        ["0%"]: {
          opacity: 0.5
        },
        ["100% "]: {
          opacity: 1
        }
      }
    }),
    wrapper: css({
      alignItems: "center",
      border: `1px solid ${borderColour}`,
      borderRadius: 175,
      display: "flex",
      height: 350,
      justifyContent: "center",
      marginBottom: spacers.medium,
      marginTop: spacers.medium,
      width: 350
    })
  };
};

/**
 * AuthPrompt
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <AuthPrompt />
 */
export class AuthPrompt extends React.PureComponent<IProps> {
  public parallaxInstance: any;

  public componentDidMount() {
    const scene = document.getElementById("scene");
    this.parallaxInstance = new Parallax(scene, {
      clipRelativeInput: true,
      relativeInput: true
    });
  }

  public componentWillUnmount() {
    this.parallaxInstance.destroy();
  }

  public render() {
    const { classes, className, onClose, ...otherProps } = this.props;

    return (
      <div className={classnames(classes.root, className)} {...otherProps}>
        <Logo />

        <div className={classes.wrapper}>
          <div id="scene" className={classes.hero}>
            <div data-depth="0.1" className={classes.layer}>
              <ImageLoader src="/assets/discover-background@2x.png" />
            </div>
            <div data-depth="0.1" className={classes.layer}>
              <ImageLoader
                className={classes.stars}
                src="/assets/discover-stars@2x.png"
              />
            </div>
            <div data-depth="0.2" className={classes.layer}>
              <ImageLoader src="/assets/discover-middle-02@2x.png" />
            </div>
            <div data-depth="0.3" className={classes.layer}>
              <ImageLoader src="/assets/discover-middle-01@2x.png" />
            </div>
            <div data-depth="0.3" className={classes.layer}>
              <ImageLoader src="/assets/discover-foreground@2x.png" />
            </div>
          </div>
        </div>

        <Heading
          center={true}
          variant="display4"
          fontWeight="bold"
          className={classes.headline}
        >
          <em className={classes.emphasise}>Discover</em> a new and exiting way
          for developers and designers to share their{" "}
          <em className={classes.emphasise}>animated</em> and{" "}
          <em className={classes.emphasise}>interactive</em> work.
        </Heading>

        <SocialAuth>
          <GithubStrategy
            render={({ onClick }) => {
              const onLogin = () => {
                onClick();
                onClose();
              };

              return <LoginButton onClick={onLogin} />;
            }}
          />
        </SocialAuth>
      </div>
    );
  }
}

export default withStyles(styles)(AuthPrompt);
