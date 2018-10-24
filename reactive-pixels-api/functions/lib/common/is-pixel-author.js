"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_handler_1 = require("./response-handler");
const models_1 = require("../models");
const common_1 = require("../common");
function isPixelAuthor(request, response, db, pixelId, uid) {
  const ref = db.collection("pixels").doc(pixelId);
  return ref
    .get()
    .then(querySnapshot => {
      return querySnapshot.data().uid === uid;
    })
    .catch(error => {
      response_handler_1.responseHandler({
        response,
        code: models_1.FirebaseApiResponseCodes[error.code],
        status: models_1.FirebaseApiResponseTypes[error.status],
        context: "check user author",
        raw: JSON.stringify(error)
      });
    });
}
exports.isPixelAuthor = isPixelAuthor;
//# sourceMappingURL=is-pixel-author.js.map
