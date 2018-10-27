import * as React from "react";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";

interface IProps {
  onClick: (provider: any) => void;
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
