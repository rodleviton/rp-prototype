"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const search_pixels_service_1 = require("./search-pixels.service");
const search_users_service_1 = require("./search-users.service");
const search_suggest_service_1 = require("./search-suggest.service");
exports.default = (app, db) => {
  app.get("/search/pixels/:searchQuery", (request, response) =>
    search_pixels_service_1.default(request, response, db)
  );
  app.get("/search/users/:searchQuery", (request, response) =>
    search_users_service_1.default(request, response, db)
  );
  app.get("/search/suggest/:searchQuery", (request, response) =>
    search_suggest_service_1.default(request, response, db)
  );
};
//# sourceMappingURL=index.js.map
