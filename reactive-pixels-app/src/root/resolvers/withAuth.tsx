import { IAuthState } from "@modules/auth/daos/authReducer";
import { IRootState } from "@root/daos/rootReducer";
import * as React from "react";
import { connect } from "react-redux";

interface IProps {
  auth: IAuthState;
}

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  class WithAuth extends React.Component<IProps> {
    public static displayName = `WithAuthUser(${WrappedComponent.name})`;

    public render() {
      const { auth, ...rest } = this.props;

      return <WrappedComponent auth={auth} {...rest} />;
    }
  }

  function mapStateToProps(state: IRootState) {
    return {
      auth: state.auth
    };
  }

  return connect(mapStateToProps)(WithAuth);
};

export default withAuth;
