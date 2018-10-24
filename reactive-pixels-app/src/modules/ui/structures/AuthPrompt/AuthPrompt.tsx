import { GithubStrategy } from "@modules/auth/components/GithubStrategy";
import { SocialAuth } from "@modules/auth/components/SocialAuth";
import { Heading } from "@modules/ui/components/Heading";
import { ImageLoader } from "@modules/ui/components/ILoader";
import { Logo } from "@modules/ui/components/Logo";
import { LoginButton } from "@modules/ui/structures/LoginButton";
import { IBaseTheme, withStyles } from "@modules/ui/theme";
import classnames from "classnames";
import { css } from "emotion";
import * as React from "react";

interface IClasses {
  emphasise: string;
  headline: string;
  hero: string;
  root: string;
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
      border: `1px solid ${borderColour}`,
      borderRadius: 150,
      height: 300,
      marginBottom: spacers.medium,
      marginTop: spacers.large,
      padding: 10,
      width: 300
    }),
    root: css({
      alignItems: "center",
      display: "flex",
      flexDirection: "column"
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
  public render() {
    const { classes, className, onClose, ...otherProps } = this.props;

    return (
      <div className={classnames(classes.root, className)} {...otherProps}>
        <Logo />

        <ImageLoader src="/assets/login-hero.jpg" className={classes.hero} />

        <Heading
          variant="display4"
          fontWeight="bold"
          className={classes.headline}
        >
          <em className={classes.emphasise}>A</em> new and exiting way for
          developers and designers to share their{" "}
          <em className={classes.emphasise}>interactive work</em>.
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
