import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";
import store from "./rootStore";

const httpLink = createHttpLink({
  uri: process.env.REACTIVE_PIXELS_GRAPHQL_BASE_URL
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from our redux store
  const { authToken } = store.getState().auth.user;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : ""
    }
  };
});

const errorLink = onError(({ networkError }) => {
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
    store.dispatch({ type: "NETWORK_ERROR" });
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: errorLink.concat(authLink.concat(httpLink))
});

export default client;
