"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const models_1 = require("../../models");
const firestore_1 = require("@google-cloud/firestore");
async function createPixelsService(request, response, db, decodedIdToken) {
  const uid = decodedIdToken.user_id;
  const displayName = decodedIdToken.name;
  const githubUserId = decodedIdToken.firebase.identities["github.com"][0]; // githubUserId
  const pixelsId = request.params.id;
  const { text } = request.body;
  const isAPixelAuthor = common_1.isPixelAuthor(
    request,
    response,
    db,
    request.params.id,
    uid
  );
  const pixelCommentsRef = db
    .collection("pixels")
    .doc(pixelsId)
    .collection("comments");
  const newComment = {
    displayName,
    githubUserId,
    timestamp: firestore_1.FieldValue.serverTimestamp(),
    text,
    uid,
    likes: [],
    author: await isAPixelAuthor
  };
  return pixelCommentsRef
    .add(newComment)
    .then(() => {
      return common_1.responseHandler({
        response,
        code: models_1.ApiResponseCodes.Success,
        status: models_1.ApiResponseTypes.Success,
        context: "create pixels comment",
        data: newComment
      });
    })
    .catch(error => {
      common_1.responseHandler({
        response,
        code: models_1.FirebaseApiResponseCodes[error.code],
        status: models_1.FirebaseApiResponseTypes[error.status],
        context: "create pixels comment",
        raw: JSON.stringify(error)
      });
    });
}
exports.default = createPixelsService;
//# sourceMappingURL=create-pixels-comment.service.js.map
