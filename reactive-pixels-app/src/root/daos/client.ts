import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import store from "./rootStore";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql"
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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

export default client;
