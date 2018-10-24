"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const models_1 = require("../../models");
var GetUsersFilters;
(function(GetUsersFilters) {
  GetUsersFilters["username"] = "username";
})(GetUsersFilters || (GetUsersFilters = {}));
function getProjectService(request, response, db) {
  // Apply filters if provided
  const usersRef = common_1.getCollectionWithFilters(
    db,
    "users",
    request.query,
    GetUsersFilters
  );
  return usersRef
    .get()
    .then(querySnapshot => {
      const data = common_1.handleDocumentCollection(querySnapshot);
      if (data.length) {
        common_1.responseHandler({
          response,
          code: models_1.ApiResponseCodes.Success,
          status: models_1.ApiResponseTypes.Success,
          context: "get users",
          data
        });
      } else {
        common_1.responseHandler({
          response,
          code: models_1.ApiResponseCodes.NotFound,
          status: models_1.ApiResponseTypes.NotFound,
          context: "users"
        });
      }
    })
    .catch(error =>
      common_1.responseHandler({
        response,
        code: models_1.ApiResponseCodes.FatalError,
        status: models_1.ApiResponseTypes.FatalError,
        context: "users",
        raw: JSON.stringify(error)
      })
    );
}
exports.default = getProjectService;
//# sourceMappingURL=get-users.service.js.map
