"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_users_service_1 = require("./get-users.service");
const get_user_by_id_service_1 = require("./get-user-by-id.service");
exports.default = (app, db) => {
  app.get("/users", (request, response) =>
    get_users_service_1.default(request, response, db)
  );
  app.get("/users/:userId", (request, response) =>
    get_user_by_id_service_1.default(request, response, db)
  );
};
//# sourceMappingURL=index.js.map
