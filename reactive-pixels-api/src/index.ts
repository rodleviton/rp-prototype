require("dotenv").config();

import * as express from "express";
import { ApolloServer } from "apollo-server-express";

import * as bodyParser from "body-parser";
import db from "./modules/common/config/db";
/* tslint:disable:no-duplicate-imports */
import { Request, Response } from "express";
import { corsMiddleware } from "./modules/common/middleware";
import { usersService } from "./services";

import { typeDefs, resolvers } from "./modules/schema";

// Create express instance
const app = express().use(corsMiddleware);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

usersService(app, db);

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("ReactivePixels");
});

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
