"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const models_1 = require("../../models");
function getPixelsCommentsService(request, response, db) {
  const pixelsId = request.params.id;
  const pixelsRef = db
    .collection("pixels")
    .doc(pixelsId)
    .collection("comments");
  return pixelsRef
    .get()
    .then(querySnapshot => {
      const data = common_1.handleDocumentCollection(querySnapshot);
      common_1.responseHandler({
        response,
        code: models_1.ApiResponseCodes.Success,
        status: models_1.ApiResponseTypes.Success,
        context: "get pixels comments",
        data
      });
    })
    .catch(error =>
      common_1.responseHandler({
        response,
        code: models_1.ApiResponseCodes.FatalError,
        status: models_1.ApiResponseTypes.FatalError,
        context: "get pixels comments",
        raw: JSON.stringify(error)
      })
    );
}
exports.default = getPixelsCommentsService;
//# sourceMappingURL=get-pixels-comments.service.js.map
