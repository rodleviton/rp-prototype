import * as React from "react";
import { connect } from "react-redux";
import { IUserModel } from "reactive-pixels-common/models/UserModel";

interface IUserData extends IUserModel {
  avatarUrl: string;
  url: string;
}

interface IProps {
  user: IUserModel;
  render: (data: IUserData) => React.ReactNode;
}
/**
 * UserComposer
 *
 * @description
 * Connected render props component for preparing User data.
 *
 * @example
 * <UserComposer user={user} />
 */
class UserComposer extends React.PureComponent<IProps> {
  public render() {
    const { render, user } = this.props;

    if (!user) {
      return render({} as IUserData);
    }

    const userData: IUserData = {
      avatarUrl: `https://github.com/${user.username}.png`,
      url: `/${user.username}`,
      ...user
    };

    return render(userData);
  }
}

export default connect()(UserComposer);
