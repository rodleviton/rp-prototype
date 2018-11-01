require("dotenv").config();

import * as express from "express";
import * as bodyParser from "body-parser";
import db from "./modules/common/config/db";
import { ApolloServer } from "apollo-server-express";
import { corsMiddleware } from "./modules/common/middleware";
import { typeDefs, resolvers } from "./modules/common/schemas";

const app = express().use(corsMiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: ({ event, context, req }) => ({
    authorization: req.headers.authorization,
    db,
    event,
    context
  })
});

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
