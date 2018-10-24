"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const models_1 = require("../../models");
var GetPixelsFilters;
(function(GetPixelsFilters) {
  GetPixelsFilters["uid"] = "uid";
})(GetPixelsFilters || (GetPixelsFilters = {}));
function getPixelsService(request, response, db) {
  // Apply filters if provided
  const pixelsRef = common_1.getCollectionWithFilters(
    db,
    "pixels",
    request.query,
    GetPixelsFilters
  );
  return pixelsRef
    .get()
    .then(querySnapshot => {
      const filterKeys = common_1.isExtended(request)
        ? models_1.pixelsExtendedPropKeys
        : models_1.pixelsBasePropKeys;
      const data = common_1.handleDocumentCollection(querySnapshot);
      const filteredData = data.map(doc =>
        common_1.filterDocument(doc, filterKeys)
      );
      common_1.responseHandler({
        response,
        code: models_1.ApiResponseCodes.Success,
        status: models_1.ApiResponseTypes.Success,
        context: "get pixels",
        data: filteredData
      });
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
exports.default = getPixelsService;
//# sourceMappingURL=get-pixels.service.js.map
