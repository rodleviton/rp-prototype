"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../../models");
const types_1 = require("../../../types");
function updateUserLikedPixels(db, loggedInUserId, pixelsToLikeId, action) {
  const userRef = db.collection("users").doc(loggedInUserId);
  return userRef
    .get()
    .then(doc => {
      const data = doc.data();
      let likedPixels = data.likedPixels;
      // Based on action -> add or remove `userToFollowId` from `following` array
      if (
        action === types_1.TogglePixelsLikeActions.Create &&
        !data.likedPixels.includes(pixelsToLikeId)
      ) {
        likedPixels = [...data.likedPixels, pixelsToLikeId];
      }
      if (
        action === types_1.TogglePixelsLikeActions.Destroy &&
        data.likedPixels.includes(pixelsToLikeId)
      ) {
        likedPixels = data.likedPixels.filter(
          project => project !== pixelsToLikeId
        );
      }
      return likedPixels;
    })
    .then(likedPixels => {
      return userRef
        .update({ likedPixels })
        .then(() => ({ data: { likedPixels } }));
    })
    .catch(error => {
      return Promise.reject({
        code: models_1.FirebaseApiResponseCodes[error.code],
        status: models_1.FirebaseApiResponseTypes[error.status],
        context: "like pixels",
        raw: JSON.stringify(error)
      });
    });
}
exports.default = updateUserLikedPixels;
//# sourceMappingURL=update-user-liked-pixels.action.js.map
