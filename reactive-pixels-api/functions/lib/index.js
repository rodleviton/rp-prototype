"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express = require("express");
const functions = require("firebase-functions");
const db_1 = require("./config/db");
const middleware_1 = require("./middleware");
const services_1 = require("./services");
const user_1 = require("./triggers/user");
const search_1 = require("./triggers/search");
// Update the search index every time a blog post is written.
exports.onUserAuth = functions.auth
  .user()
  .onCreate(event => user_1.onUserAuth(event, db_1.default));
exports.onUserCreated = functions.firestore
  .document("users/{userId}")
  .onCreate(search_1.onUserCreated);
exports.onPixelsCreated = functions.firestore
  .document("pixels/{pixelsId}")
  .onCreate(search_1.onPixelsCreated);
// Create express instance
const app = express().use(middleware_1.corsMiddleware);
// Add swagger middleware
middleware_1.swaggerMiddleware(app);
// Invoke services
services_1.pixelsService(app, db_1.default);
services_1.usersService(app, db_1.default);
services_1.reposService(app, db_1.default);
services_1.friendshipsService(app, db_1.default);
services_1.searchService(app, db_1.default);
// Export api
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map
