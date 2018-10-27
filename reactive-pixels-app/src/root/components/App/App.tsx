import { Header } from "@modules/reactive-pixels-ui/structures/Header";
import { createTheme, ThemeProvider } from "@modules/reactive-pixels-ui/theme";
import { ModalRoot } from "@root/containers/ModalRoot";
import { UserAuthWidget } from "@root/containers/UserAuthWidget";
import client from "@root/daos/client";
import routes, { IRoute } from "@root/daos/rootRoutes";
import store from "@root/daos/rootStore";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const theme = createTheme();

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Router>
              <React.Fragment>
                <Header>
                  <UserAuthWidget />
                </Header>
                <Switch>
                  {routes.map((route: IRoute, i: number) => {
                    return (
                      <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        render={props => <route.component {...props} />}
                      />
                    );
                  })}
                </Switch>
                <ModalRoot />
              </React.Fragment>
            </Router>
          </ThemeProvider>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
