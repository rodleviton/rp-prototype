"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const actions_1 = require("./actions");
const models_1 = require("../../models");
var TogglePixelsLikeActions;
(function(TogglePixelsLikeActions) {
  TogglePixelsLikeActions["Destroy"] = "Destroy";
})(TogglePixelsLikeActions || (TogglePixelsLikeActions = {}));
function destroyPixelsLikeService(request, response, db, decodedIdToken) {
  const accessToken = request.headers["access-token"];
  const loggedInUserId = decodedIdToken.user_id;
  const pixelsToLikeId = request.params.id;
  // Update user friendships
  Promise.all([
    actions_1.updatePixelsLikes(
      db,
      loggedInUserId,
      pixelsToLikeId,
      TogglePixelsLikeActions.Destroy
    ),
    actions_1.updateUserLikedPixels(
      db,
      loggedInUserId,
      pixelsToLikeId,
      TogglePixelsLikeActions.Destroy
    )
  ])
    .then(result => {
      common_1.responseHandler({
        response,
        code: models_1.ApiResponseCodes.Success,
        status: models_1.ApiResponseTypes.Success,
        context: "like pixels",
        data: Object.assign(
          {},
          { [pixelsToLikeId]: result[0].data },
          { [loggedInUserId]: result[1].data }
        )
      });
    })
    .catch(error => {
      common_1.responseHandler({
        response,
        code: models_1.FirebaseApiResponseCodes[error.code],
        status: models_1.FirebaseApiResponseTypes[error.status],
        context: "like pixels",
        raw: JSON.stringify(error)
      });
    });
}
exports.default = destroyPixelsLikeService;
//# sourceMappingURL=destroy-pixels-like.service.js.map
