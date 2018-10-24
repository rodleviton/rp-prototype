"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../../models");
var TogglePixelsLikeActions;
(function(TogglePixelsLikeActions) {
  TogglePixelsLikeActions["Create"] = "Create";
  TogglePixelsLikeActions["Destroy"] = "Destroy";
})(TogglePixelsLikeActions || (TogglePixelsLikeActions = {}));
function updatePixelsLikes(db, loggedInUserId, pixelsToLikeId, action) {
  const projectRef = db.collection("pixels").doc(pixelsToLikeId);
  return projectRef
    .get()
    .then(doc => {
      const data = doc.data();
      let likes = data.likes;
      // Based on action -> add or remove `userToFollowId` from `following` array
      if (
        action === TogglePixelsLikeActions.Create &&
        !data.likes.includes(loggedInUserId)
      ) {
        likes = [...data.likes, loggedInUserId];
      }
      if (
        action === TogglePixelsLikeActions.Destroy &&
        data.likes.includes(loggedInUserId)
      ) {
        likes = data.likes.filter(like => like !== loggedInUserId);
      }
      return likes;
    })
    .then(likes => {
      return projectRef.update({ likes }).then(() => ({ data: { likes } }));
    })
    .catch(error => {
      console.log(error);
      return Promise.reject({
        code: models_1.FirebaseApiResponseCodes[error.code],
        status: models_1.FirebaseApiResponseTypes[error.status],
        context: "like pixels",
        raw: JSON.stringify(error)
      });
    });
}
exports.default = updatePixelsLikes;
//# sourceMappingURL=update-pixels-likes.action.js.map
