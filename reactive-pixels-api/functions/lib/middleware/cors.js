"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function corsMiddleware(req, res, next) {
  const defaultDomain = "http://localhost:3000";
  const allowedDomains = [
    defaultDomain,
    "http://localhost:5000",
    "http://localhost:5004",
    "https://staging.reactivepixels.com"
  ];
  const origin = req.headers ? req.headers.origin : defaultDomain;
  const finalOrigin =
    allowedDomains.indexOf(origin) >= 0 ? origin : defaultDomain;
  res.header("Access-Control-Allow-Origin", finalOrigin);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Token, Authorization, Content-Type"
  );
  next();
}
exports.default = corsMiddleware;
//# sourceMappingURL=cors.js.map
