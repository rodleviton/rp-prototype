"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerTools = require("swagger-tools");
const YAML = require("yamljs");
const path = require("path");
const swaggerDoc = YAML.load(path.join(process.cwd(), "src/schema/api.yaml"));
function default_1(app) {
  swaggerTools.initializeMiddleware(swaggerDoc, function(middleware) {
    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());
  });
}
exports.default = default_1;
//# sourceMappingURL=swagger.js.map
