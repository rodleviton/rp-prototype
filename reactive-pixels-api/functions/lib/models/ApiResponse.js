"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiResponseTypes;
(function(ApiResponseTypes) {
  ApiResponseTypes["Success"] = "SUCCESS";
  ApiResponseTypes["NotAuthorised"] = "NOT_AUTHORISED";
  ApiResponseTypes["Forbidden"] = "FORBIDDEN";
  ApiResponseTypes["NotFound"] = "NOT_FOUND";
  ApiResponseTypes["FatalError"] = "FATAL_ERROR";
})(
  (ApiResponseTypes =
    exports.ApiResponseTypes || (exports.ApiResponseTypes = {}))
);
var ApiResponseCodes;
(function(ApiResponseCodes) {
  ApiResponseCodes[(ApiResponseCodes["Success"] = 200)] = "Success";
  ApiResponseCodes[(ApiResponseCodes["NotAuthorised"] = 401)] = "NotAuthorised";
  ApiResponseCodes[(ApiResponseCodes["Forbidden"] = 403)] = "Forbidden";
  ApiResponseCodes[(ApiResponseCodes["NotFound"] = 404)] = "NotFound";
  ApiResponseCodes[(ApiResponseCodes["FatalError"] = 500)] = "FatalError";
})(
  (ApiResponseCodes =
    exports.ApiResponseCodes || (exports.ApiResponseCodes = {}))
);
exports.FirebaseApiResponseCodes = {
  auth: ApiResponseCodes.NotAuthorised
};
exports.FirebaseApiResponseTypes = {
  auth: ApiResponseTypes.NotAuthorised
};
//# sourceMappingURL=ApiResponse.js.map
