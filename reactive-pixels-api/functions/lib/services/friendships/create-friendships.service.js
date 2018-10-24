"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const actions_1 = require("./actions");
const models_1 = require("../../models");
var ToggleFriendshipActions;
(function(ToggleFriendshipActions) {
  ToggleFriendshipActions["Create"] = "Create";
})(ToggleFriendshipActions || (ToggleFriendshipActions = {}));
function createFriendshipsService(request, response, db, decodedIdToken) {
  const accessToken = request.headers["access-token"];
  const loggedInUserId = decodedIdToken.user_id;
  const userToFollowId = request.params.userId;
  // Update user friendships
  Promise.all([
    actions_1.updateUserFollowing(
      db,
      loggedInUserId,
      userToFollowId,
      ToggleFriendshipActions.Create
    ),
    actions_1.updateUserFollowers(
      db,
      loggedInUserId,
      userToFollowId,
      ToggleFriendshipActions.Create
    )
  ])
    .then(result => {
      common_1.responseHandler({
        response,
        code: models_1.ApiResponseCodes.Success,
        status: models_1.ApiResponseTypes.Success,
        context: "create friendship",
        data: Object.assign(
          {},
          { [loggedInUserId]: result[0].data },
          { [userToFollowId]: result[1].data }
        )
      });
    })
    .catch(error => {
      common_1.responseHandler({
        response,
        code: models_1.FirebaseApiResponseCodes[error.code],
        status: models_1.FirebaseApiResponseTypes[error.status],
        context: "friendships",
        raw: JSON.stringify(error)
      });
    });
}
exports.default = createFriendshipsService;
//# sourceMappingURL=create-friendships.service.js.map
