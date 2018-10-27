import { initAuthUser } from "@modules/auth/daos/authActions";
import * as firebase from "firebase/app";
import gql from "graphql-tag";
import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

interface IProps {
  dispatch: Dispatch<ActionType<typeof initAuthUser>>;
}

interface IState {
  authUser: {
    authToken: string;
    githubUserId: string;
    id: string;
    refreshToken: string;
  };
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

const query = gql`
  query User($id: ID!) {
    authUser: getUserById(id: $id) {
      id
      email
      githubUserId
      displayName
      following
      followers
      likedPixels
      username
      location
      isFirstLogin
    }
  }
`;

class SocialAuth extends React.Component<IProps, IState> {
  public state = {
    authUser: {
      authToken: "",
      githubUserId: "",
      id: "",
      refreshToken: ""
    }
  };

  public componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.addAuthenticatedUser(user as IAuthUser);
    });
  }

  public addAuthenticatedUser(authUser: IAuthUser) {
    if (authUser) {
      authUser.getIdToken().then((authToken: string) => {
        this.setState({
          authUser: {
            authToken,
            githubUserId: authUser.providerData[0].uid,
            id: authUser.uid,
            refreshToken: authUser.refreshToken
          }
        });
      });
    }
  }

  public handleAuthClick = (provider: firebase.auth.AuthProvider) => {
    const { dispatch } = this.props;

    dispatch(initAuthUser.request());
    firebase.auth().signInWithPopup(provider);
  };

  public getAuthUser = async (client: any) => {
    const { dispatch } = this.props;
    const { authUser } = this.state;

    const { data } = await client.query({
      query,
      variables: { id: authUser.id }
    });

    dispatch(
      initAuthUser.success({
        ...authUser,
        ...data.authUser
      })
    );
  };

  public render() {
    const { children } = this.props;
    const { authUser } = this.state;

    return (
      <ApolloConsumer>
        {client => {
          if (authUser.id) {
            // As soon as we have an id let go get or create the user
            this.getAuthUser(client);
          }

          return (
            <SocialAuthContext.Provider
              value={{ onAuth: this.handleAuthClick }}
            >
              {children}
            </SocialAuthContext.Provider>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default connect(null)(SocialAuth);
