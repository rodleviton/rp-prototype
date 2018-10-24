"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../../models");
var ToggleFriendshipActions;
(function(ToggleFriendshipActions) {
  ToggleFriendshipActions["Create"] = "Create";
  ToggleFriendshipActions["Destroy"] = "Destroy";
})(ToggleFriendshipActions || (ToggleFriendshipActions = {}));
function updateUserFollowers(db, loggedInUserId, userToFollowId, action) {
  const userRef = db.collection("users").doc(userToFollowId);
  return userRef
    .get()
    .then(doc => {
      const data = doc.data();
      let followers = data.followers;
      // Based on action -> add or remove `userToFollowId` from `following` array
      if (
        action === ToggleFriendshipActions.Create &&
        !data.followers.includes(loggedInUserId)
      ) {
        followers = [...data.followers, loggedInUserId];
      }
      if (
        action === ToggleFriendshipActions.Destroy &&
        data.followers.includes(loggedInUserId)
      ) {
        followers = data.followers.filter(
          friendship => friendship !== loggedInUserId
        );
      }
      return followers;
    })
    .then(followers => {
      return userRef
        .update({ followers })
        .then(() => ({ data: { followers } }));
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
exports.default = updateUserFollowers;
//# sourceMappingURL=update-user-followers.actions.js.map
