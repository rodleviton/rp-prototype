"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const actions_1 = require("./actions");
const types_1 = require("../../types");
const models_1 = require("../../models");
function createPixelsCommentLikeService(request, response, db, decodedIdToken) {
  const loggedInUserId = decodedIdToken.user_id;
  const pixelId = request.params.id;
  const pixelsCommentToLikeId = request.params.comment;
  Promise.all([
    actions_1.updatePixelsCommentLikes(
      db,
      loggedInUserId,
      pixelId,
      pixelsCommentToLikeId,
      types_1.TogglePixelsLikeActions.Create
    )
  ])
    .then(result => {
      common_1.responseHandler({
        response,
        code: models_1.ApiResponseCodes.Success,
        status: models_1.ApiResponseTypes.Success,
        context: "like pixels comment",
        data: result
      });
    })
    .catch(error => {
      common_1.responseHandler({
        response,
        code: models_1.FirebaseApiResponseCodes[error.code],
        status: models_1.FirebaseApiResponseTypes[error.status],
        context: "like pixels comment",
        raw: JSON.stringify(error)
      });
    });
}
exports.default = createPixelsCommentLikeService;
//# sourceMappingURL=create-pixels-comment-like.service.js.map
