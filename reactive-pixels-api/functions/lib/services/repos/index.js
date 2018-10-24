"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_repos_service_1 = require("./get-repos.service");
const common_1 = require("../../common");
exports.default = (app, db) => {
  app.get("/repos/:owner", (request, response) => {
    common_1
      .isAuthorized(response, request.headers.authorization)
      .then(() => get_repos_service_1.default(request, response, db))
      .catch(error =>
        common_1.responseHandler({
          response,
          code: error.code,
          status: error.status,
          context: "repos",
          raw: error.raw
        })
      );
  });
};
//# sourceMappingURL=index.js.map
