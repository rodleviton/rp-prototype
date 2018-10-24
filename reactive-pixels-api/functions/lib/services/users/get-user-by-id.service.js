"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const models_1 = require("../../models");
function getUserByIdService(request, response, db) {
  const userId = request.params.userId;
  const userRef = db.collection("users").doc(userId);
  return userRef
    .get()
    .then(doc => {
      if (doc.exists) {
        const data = common_1.handleDocument(doc);
        common_1.responseHandler({
          response,
          code: models_1.ApiResponseCodes.Success,
          status: models_1.ApiResponseTypes.Success,
          context: "get user",
          data
        });
      } else {
        common_1.responseHandler({
          response,
          code: models_1.ApiResponseCodes.NotFound,
          status: models_1.ApiResponseTypes.NotFound,
          context: "user"
        });
      }
    })
    .catch(error =>
      common_1.responseHandler({
        response,
        code: models_1.ApiResponseCodes.FatalError,
        status: models_1.ApiResponseTypes.FatalError,
        context: "user",
        raw: JSON.stringify(error)
      })
    );
}
exports.default = getUserByIdService;
//# sourceMappingURL=get-user-by-id.service.js.map
