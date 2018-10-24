"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const models_1 = require("../models");
function isAuthorized(response, authorization) {
  if (authorization && authorization.startsWith("Bearer ")) {
    // Read the ID Token from the Authorization header.
    const idToken = authorization.split("Bearer ")[1];
    return admin
      .auth()
      .verifyIdToken(idToken)
      .catch(error => {
        return Promise.reject({
          code: models_1.FirebaseApiResponseCodes[error.codePrefix],
          status: models_1.FirebaseApiResponseTypes[error.codePrefix],
          raw: JSON.stringify(error)
        });
      });
  }
  return new Promise((resolve, reject) => {
    const apiResponse = {
      code: models_1.ApiResponseCodes.NotAuthorised,
      status: models_1.ApiResponseTypes.NotAuthorised
    };
    reject(apiResponse);
  });
}
exports.isAuthorized = isAuthorized;
//# sourceMappingURL=is-authorized.js.map
