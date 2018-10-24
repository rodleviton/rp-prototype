"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../../models");
const types_1 = require("../../../types");
function updatePixelsCommentLikes(
  db,
  loggedInUserId,
  pixelId,
  pixelsCommentToLikeId,
  action
) {
  const projectRef = db
    .collection("pixels")
    .doc(pixelId)
    .collection("comments")
    .doc(pixelsCommentToLikeId);
  return projectRef
    .get()
    .then(doc => {
      const data = doc.data();
      let likes = data.likes;
      if (
        action === types_1.TogglePixelsLikeActions.Create &&
        !data.likes.includes(loggedInUserId)
      ) {
        likes = [...data.likes, loggedInUserId];
      }
      if (
        action === types_1.TogglePixelsLikeActions.Destroy &&
        data.likes.includes(loggedInUserId)
      ) {
        likes = data.likes.filter(like => like !== loggedInUserId);
      }
      return likes;
    })
    .then(likes => {
      return projectRef.update({ likes }).then(() => ({ data: likes }));
    })
    .catch(error => {
      console.log(error);
      return Promise.reject({
        code: models_1.FirebaseApiResponseCodes[error.code],
        status: models_1.FirebaseApiResponseTypes[error.status],
        context: "like pixels comments",
        raw: JSON.stringify(error)
      });
    });
}
exports.default = updatePixelsCommentLikes;
//# sourceMappingURL=update-pixels-comment-likes.action.js.map
