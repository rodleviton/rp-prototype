import { IAuthState } from "@modules/auth/daos/authReducer";
import * as React from "react";
import { IAuthUserModel } from "reactive-pixels-common/models/AuthUserModel";

interface IAuthData {
  user: IAuthUserModel;
  isAuthenticated: boolean;
}

interface IProps {
  auth: IAuthState;
  render: (authData: IAuthData) => React.ReactNode;
}
/**
 * AuthComposer
 *
 * @description
 * Connected render props component for preparing Auth data.
 *
 * @example
 * <AuthComposer />
 */
class AuthComposer extends React.PureComponent<IProps> {
  public render() {
    const { auth, render } = this.props;

    return render({ isAuthenticated: !!auth.user.id, user: auth.user });
  }
}

export default AuthComposer;
