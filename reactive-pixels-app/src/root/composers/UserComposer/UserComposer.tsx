import * as React from "react";
import { connect } from "react-redux";
import {
  IUserExtendedModel,
  IUserModel
} from "reactive-pixels-common/models/UserModel";

interface IUserData extends IUserModel {
  avatarUrl: string;
  isFollowedByLoggedInUser: boolean;
  numberOfFollowers: number;
  numberOfFollowing: number;
  url: string;
}

interface IUserExtendedData extends IUserExtendedModel {
  avatarUrl: string;
  url: string;
}

interface IProps {
  loggedInUserId?: string;
  user: IUserModel | IUserExtendedModel;
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
  public isFollowedByLoggedInUser = () => {
    const { loggedInUserId = "", user } = this.props;

    return user.followers.includes(loggedInUserId);
  };

  public render() {
    const { render, user } = this.props;

    if (!user || !user.id) {
      return render({
        isFollowedByLoggedInUser: false,
        numberOfFollowers: 0,
        numberOfFollowing: 0
      } as IUserData);
    }

    const userData: IUserData | IUserExtendedData = {
      avatarUrl: `https://github.com/${user.username}.png`,
      isFollowedByLoggedInUser: this.isFollowedByLoggedInUser(),
      numberOfFollowers: user.followers.length,
      numberOfFollowing: user.following.length,
      url: `/${user.username}`,
      ...user
    };

    return render(userData);
  }
}

export default connect()(UserComposer);
