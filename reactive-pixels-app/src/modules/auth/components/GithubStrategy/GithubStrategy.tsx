import {
  IHandleAuthClick,
  SocialAuthContext
} from "@modules/auth/components/SocialAuth";
import * as firebase from "firebase/app";
import "firebase/auth";
import * as React from "react";

interface IRenderProps {
  onClick: () => any;
}

interface IProps {
  render: ({ onClick }: IRenderProps) => React.ReactNode;
}

export default class GithubStrategy extends React.PureComponent<IProps> {
  public render() {
    const { render } = this.props;

    return (
      <SocialAuthContext.Consumer>
        {(context: IHandleAuthClick) => {
          if (!context) {
            throw new Error(
              `Social auth strategies cannot be rendered outside of Social Auth component`
            );
          }

          const provider = new firebase.auth.GithubAuthProvider();
          const onClick = () => context.onAuth(provider);

          return render({ onClick });
        }}
      </SocialAuthContext.Consumer>
    );
  }
}
