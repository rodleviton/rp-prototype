import { initAuthUser } from "@modules/auth/daos/authActions";
import axios from "axios";
import * as firebase from "firebase/app";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

interface IProps {
  dispatch: Dispatch<ActionType<typeof initAuthUser>>;
}

export interface IProviderData {
  uid: string;
}

export interface IAuthUser {
  providerData: IProviderData[];
  uid: string;
  refreshToken: string;
  getIdToken: () => Promise<string>;
}

export interface IHandleAuthClick {
  onAuth: (strategy: firebase.auth.AuthProvider) => void;
}

export const SocialAuthContext = React.createContext<IHandleAuthClick>(
  {} as IHandleAuthClick
);

class SocialAuth extends React.Component<IProps, {}> {
  public componentWillMount() {
    firebase.auth().onAuthStateChanged((user: any) => {
      this.addAuthenticatedUser(user);
    });
  }

  public addAuthenticatedUser(authUser: IAuthUser) {
    const { dispatch } = this.props;

    if (authUser) {
      authUser.getIdToken().then((authToken: string) => {
        // TODO - ADD THIS TO API REQUEST MIDDLEWARE
        // Add authorization headers
        axios.defaults.headers.common.Authorization = "Bearer " + authToken;
        // console.log("Bearer " + authToken);

        dispatch(
          initAuthUser.success({
            authToken,
            githubUserId: authUser.providerData[0].uid,
            id: authUser.uid,
            refreshToken: authUser.refreshToken
          })
        );
      });
    }
  }

  public handleAuthClick = (provider: firebase.auth.AuthProvider) => {
    const { dispatch } = this.props;

    dispatch(initAuthUser.request());
    firebase.auth().signInWithPopup(provider);
  };

  public render() {
    const { children } = this.props;
    return (
      <SocialAuthContext.Provider value={{ onAuth: this.handleAuthClick }}>
        {children}
      </SocialAuthContext.Provider>
    );
  }
}

export default connect(null)(SocialAuth);
