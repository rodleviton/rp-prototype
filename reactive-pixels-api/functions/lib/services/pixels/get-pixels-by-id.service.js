"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const models_1 = require("../../models");
function getPixelsByIdService(request, response, db) {
  const pixelsId = request.params.id;
  const pixelsRef = db.collection("pixels").doc(pixelsId);
  return pixelsRef
    .get()
    .then(doc => {
      if (doc.exists) {
        const filterKeys = common_1.isExtended(request)
          ? models_1.pixelsExtendedPropKeys
          : models_1.pixelsBasePropKeys;
        const data = common_1.handleDocument(doc);
        const filteredData = common_1.filterDocument(data, filterKeys);
        common_1.responseHandler({
          response,
          code: models_1.ApiResponseCodes.Success,
          status: models_1.ApiResponseTypes.Success,
          context: "get pixels",
          data: filteredData
        });
      } else {
        common_1.responseHandler({
          response,
          code: models_1.ApiResponseCodes.NotFound,
          status: models_1.ApiResponseTypes.NotFound,
          context: "pixels"
        });
      }
    })
    .catch(error =>
      common_1.responseHandler({
        response,
        code: models_1.ApiResponseCodes.FatalError,
        status: models_1.ApiResponseTypes.FatalError,
        context: "pixels",
        raw: JSON.stringify(error)
      })
    );
}
exports.default = getPixelsByIdService;
//# sourceMappingURL=get-pixels-by-id.service.js.map
