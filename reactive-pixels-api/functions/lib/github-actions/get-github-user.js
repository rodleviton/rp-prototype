"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
async function getGithubUser({ accessToken, id }) {
  const config = accessToken
    ? {
        headers: {
          Authorization: accessToken
        }
      }
    : {};
  const octokit = require("@octokit/rest")(config);
  return octokit.users
    .getById({ id })
    .then(result => {
      const data = {
        id: result.data.id,
        username: result.data.login,
        location: result.data.location
      };
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
exports.default = getGithubUser;
//# sourceMappingURL=get-github-user.js.map
