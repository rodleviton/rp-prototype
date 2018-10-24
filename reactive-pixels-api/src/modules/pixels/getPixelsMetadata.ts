import ApolloClient from "apollo-boost";
import "cross-fetch/polyfill";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    Authorization: `Bearer ${process.env.PERSONAL_ACCESS_TOKEN}`
  }
});

export default async function getPixelsMetadata(owner: string, repo: string) {
  return client
    .query({
      variables: {
        owner,
        repo
      },
      query: gql`
        query {
          repository(owner: $owner, name: $repo) {
            id
            description
          }
        }
      `
    })
    .then((data: any) => {
      return {
        id: data.data.id,
        description: data.data.description
      };
    })
    .catch(error => {
      throw new Error(error);
    });
}
