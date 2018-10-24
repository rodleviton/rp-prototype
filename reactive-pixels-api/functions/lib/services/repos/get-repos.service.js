"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const github_actions_1 = require("../../github-actions");
const models_1 = require("../../models");
async function getReposService(request, response, db) {
  const accessToken = request.headers["access-token"];
  const owner = request.params.owner;
  let reposData;
  try {
    reposData = await github_actions_1.getGithubRepos(accessToken, owner);
    return common_1.responseHandler({
      response,
      code: models_1.ApiResponseCodes.Success,
      status: models_1.ApiResponseTypes.Success,
      context: "get repos",
      data: reposData.data
    });
  } catch (error) {
    return common_1.responseHandler({
      response,
      code: error.code,
      status: error.status,
      context: "repos",
      raw: JSON.stringify(error)
    });
  }
}
exports.default = getReposService;
//# sourceMappingURL=get-repos.service.js.map
