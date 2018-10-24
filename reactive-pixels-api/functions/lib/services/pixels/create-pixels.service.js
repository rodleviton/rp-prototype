"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const models_1 = require("../../models");
const get_github_repo_meta_1 = require("../../github-actions/get-github-repo-meta");
async function createPixelsService(request, response, db, decodedIdToken) {
  const accessToken = request.headers["access-token"];
  const uid = decodedIdToken.user_id;
  const { owner, repo, title } = request.body;
  let repoData;
  try {
    repoData = await get_github_repo_meta_1.default(accessToken, owner, repo);
  } catch (error) {
    return common_1.responseHandler({
      response,
      code: error.code,
      status: error.status,
      context: "pixels",
      raw: JSON.stringify(error)
    });
  }
  const { description, topics, files } = repoData.data;
  const pixelsData = {
    title,
    description,
    topics,
    owner,
    repo,
    uid,
    likes: [],
    files
  };
  return db
    .collection("pixels")
    .add(pixelsData)
    .then(docRef => {
      common_1.responseHandler({
        response,
        code: models_1.ApiResponseCodes.Success,
        status: models_1.ApiResponseTypes.Success,
        context: "create pixels",
        data: Object.assign({}, pixelsData, { id: docRef.id })
      });
    })
    .catch(error => {
      common_1.responseHandler({
        response,
        code: models_1.FirebaseApiResponseCodes[error.code],
        status: models_1.FirebaseApiResponseTypes[error.status],
        context: "pixels",
        raw: JSON.stringify(error)
      });
    });
}
exports.default = createPixelsService;
//# sourceMappingURL=create-pixels.service.js.map
