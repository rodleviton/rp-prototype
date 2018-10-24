"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_friendships_service_1 = require("./create-friendships.service");
const destroy_friendships_service_1 = require("./destroy-friendships.service");
const common_1 = require("../../common");
exports.default = (app, db) => {
  app.post("/friendships/outgoing/:userId", (request, response) => {
    common_1
      .isAuthorized(response, request.headers.authorization)
      .then(decodedIdToken => {
        create_friendships_service_1.default(
          request,
          response,
          db,
          decodedIdToken
        );
      })
      .catch(error =>
        common_1.responseHandler({
          response,
          code: error.code,
          status: error.status,
          context: "friendships",
          raw: error.raw
        })
      );
  });
  app.delete("/friendships/outgoing/:userId", (request, response) => {
    common_1
      .isAuthorized(response, request.headers.authorization)
      .then(decodedIdToken => {
        destroy_friendships_service_1.default(
          request,
          response,
          db,
          decodedIdToken
        );
      })
      .catch(error =>
        common_1.responseHandler({
          response,
          code: error.code,
          status: error.status,
          context: "friendships",
          raw: error.raw
        })
      );
  });
};
//# sourceMappingURL=index.js.map
