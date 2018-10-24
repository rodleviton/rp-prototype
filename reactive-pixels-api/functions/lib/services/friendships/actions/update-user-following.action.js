"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../../models");
var ToggleFriendshipActions;
(function(ToggleFriendshipActions) {
  ToggleFriendshipActions["Create"] = "Create";
  ToggleFriendshipActions["Destroy"] = "Destroy";
})(ToggleFriendshipActions || (ToggleFriendshipActions = {}));
function updateUserFollowing(db, loggedInUserId, userToFollowId, action) {
  const userRef = db.collection("users").doc(loggedInUserId);
  return userRef
    .get()
    .then(doc => {
      const data = doc.data();
      let following = data.following;
      // Based on action -> add or remove `userToFollowId` from `following` array
      if (
        action === ToggleFriendshipActions.Create &&
        !data.following.includes(userToFollowId)
      ) {
        following = [...data.following, userToFollowId];
      }
      if (
        action === ToggleFriendshipActions.Destroy &&
        data.following.includes(userToFollowId)
      ) {
        following = data.following.filter(
          friendship => friendship !== userToFollowId
        );
      }
      return following;
    })
    .then(following => {
      return userRef
        .update({ following })
        .then(() => ({ data: { following } }));
    })
    .catch(error => {
      return Promise.reject({
        code: models_1.FirebaseApiResponseCodes[error.code],
        status: models_1.FirebaseApiResponseTypes[error.status],
        context: "friendships",
        raw: JSON.stringify(error)
      });
    });
}
exports.default = updateUserFollowing;
//# sourceMappingURL=update-user-following.action.js.map
