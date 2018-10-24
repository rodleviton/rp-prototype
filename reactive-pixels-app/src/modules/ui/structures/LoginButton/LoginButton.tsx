import { Button } from "@modules/ui/components/Button";
import { Icon } from "@modules/ui/components/Icon";
import * as React from "react";

interface IProps {
  onClick: (provider: firebase.auth.AuthProvider) => void;
}
/**
 * LoginButton
 *
 * @param {string} [className=""] - Extend css classes to override default styling.
 * @example
 * <LoginButton />
 */
class LoginButton extends React.PureComponent<IProps> {
  public render() {
    const { onClick, ...otherProps } = this.props;

    return (
      <Button onClick={onClick} variant="secondary" icon="left" {...otherProps}>
        <Icon.Github colour="dark" /> Sign in with Github
      </Button>
    );
  }
}

export default LoginButton;
