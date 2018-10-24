"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_pixels_service_1 = require("./get-pixels.service");
const get_pixels_by_id_service_1 = require("./get-pixels-by-id.service");
const create_pixels_service_1 = require("./create-pixels.service");
const create_pixels_like_service_1 = require("./create-pixels-like.service");
const destroy_pixels_like_service_1 = require("./destroy-pixels-like.service");
const get_pixels_comments_service_1 = require("./get-pixels-comments.service");
const create_pixels_comment_service_1 = require("./create-pixels-comment.service");
const create_pixels_comment_like_service_1 = require("./create-pixels-comment-like.service");
const common_1 = require("../../common");
exports.default = (app, db) => {
  app.get("/pixels", (request, response) =>
    get_pixels_service_1.default(request, response, db)
  );
  app.get("/pixels/:id", (request, response) =>
    get_pixels_by_id_service_1.default(request, response, db)
  );
  app.post("/pixels", (request, response) => {
    common_1
      .isAuthorized(response, request.headers.authorization)
      .then(decodedIdToken => {
        create_pixels_service_1.default(request, response, db, decodedIdToken);
      })
      .catch(error =>
        common_1.responseHandler({
          response,
          code: error.code,
          status: error.status,
          context: "pixels",
          raw: error.raw
        })
      );
  });
  app.post("/pixels/:id/likes", (request, response) => {
    common_1
      .isAuthorized(response, request.headers.authorization)
      .then(decodedIdToken => {
        create_pixels_like_service_1.default(
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
          context: "like pixels",
          raw: error.raw
        })
      );
  });
  app.delete("/pixels/:id/likes", (request, response) => {
    common_1
      .isAuthorized(response, request.headers.authorization)
      .then(decodedIdToken => {
        destroy_pixels_like_service_1.default(
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
          context: "like pixels",
          raw: error.raw
        })
      );
  });
  app.get("/pixels/:id/comments", (request, response) =>
    get_pixels_comments_service_1.default(request, response, db)
  );
  app.post("/pixels/:id/comments", (request, response) => {
    common_1
      .isAuthorized(response, request.headers.authorization)
      .then(decodedIdToken => {
        create_pixels_comment_service_1.default(
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
          context: "pixels comment",
          raw: error.raw
        })
      );
  });
  app.post("/pixels/:id/comments/:comment/likes", (request, response) => {
    common_1
      .isAuthorized(response, request.headers.authorization)
      .then(decodedIdToken => {
        create_pixels_comment_like_service_1.default(
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
          context: "pixels comment like",
          raw: error.raw
        })
      );
  });
  app.delete("/pixels/:id/comments/:comment/likes", (request, response) => {
    response.json({ message: "noooiiiceeee!" });
  });
};
//# sourceMappingURL=index.js.map
