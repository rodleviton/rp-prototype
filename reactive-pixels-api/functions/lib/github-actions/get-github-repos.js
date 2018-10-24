"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
async function getGithubRepos(accessToken, owner) {
  const octokit = require("@octokit/rest")({
    headers: {
      Authorization: accessToken
    }
  });
  return octokit.repos
    .getForUser({ username: owner })
    .then(result => {
      const data = result.data.map(item => ({
        id: item.id,
        name: item.name,
        owner: item.owner.login
      }));
      return {
        code: models_1.ApiResponseCodes.Success,
        status: models_1.ApiResponseTypes.Success,
        data
      };
    })
    .catch(error => {
      return Promise.reject({
        code: error.code,
        status: error.status,
        raw: JSON.stringify(error)
      });
    });
}
exports.default = getGithubRepos;
//# sourceMappingURL=get-github-repos.js.map
