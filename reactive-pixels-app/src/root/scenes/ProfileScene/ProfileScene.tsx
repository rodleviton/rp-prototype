import { UserProfile } from "@root/containers/UserProfile";
import * as React from "react";
import { match } from "react-router";

interface IProps {
  match: match<{ username: string }>;
}

class ProfileScene extends React.Component<IProps> {
  public render() {
    const { username } = this.props.match.params;

    return <UserProfile username={username} />;
  }
}

export default ProfileScene;
