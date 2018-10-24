"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
var FilePaths;
(function(FilePaths) {
  FilePaths["App"] = "app";
  FilePaths["Index"] = "index.html";
  FilePaths["JS"] = "script.js";
  FilePaths["CSS"] = "style.css";
})((FilePaths = exports.FilePaths || (exports.FilePaths = {})));
async function getGithubRepoMeta(owner, repo) {
  const octokit = require("@octokit/rest")({});

  octokit.authenticate({
    type: "oauth",
    key: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
  });

  const getValidFiles = contents => {
    // These files must exist in the `app` folder
    const allowedFiles = [FilePaths.Index, FilePaths.JS, FilePaths.CSS];
    const files = contents.data
      .map(file => file.name)
      .filter(name => allowedFiles.indexOf(name) !== -1);
    if (files.length !== allowedFiles.length) {
      return Promise.reject({
        code: models_1.ApiResponseCodes.NotFound,
        status: models_1.ApiResponseTypes.NotFound,
        context: "valid repo"
      });
    }
    return files;
  };
  const getRepoContents = () => {
    const apiRequests = [
      octokit.repos.get({ owner, repo }),
      octokit.repos.getTopics({ owner, repo }),
      octokit.repos.getContent({
        owner,
        repo,
        path: `${FilePaths.App}/${FilePaths.Index}`
      }),
      octokit.repos.getContent({
        owner,
        repo,
        path: `${FilePaths.App}/${FilePaths.JS}`
      }),
      octokit.repos.getContent({
        owner,
        repo,
        path: `${FilePaths.App}/${FilePaths.CSS}`
      })
    ];
    return Promise.all(apiRequests)
      .then(results => {
        return {
          code: models_1.ApiResponseCodes.Success,
          status: models_1.ApiResponseTypes.Success,
          data: {
            description: results[0].data.description,
            topics: results[1].data.names,
            files: {
              html: results[2].data.content,
              js: results[3].data.content,
              css: results[4].data.content
            }
          }
        };
      })
      .catch(error => {
        return Promise.reject({
          code: error.code,
          status: error.status,
          raw: JSON.stringify(error)
        });
      });
  };
  return octokit.repos
    .getContent({ owner, repo, path: FilePaths.App })
    .then(getValidFiles)
    .then(getRepoContents)
    .catch(error => {
      return Promise.reject({
        code: error.code,
        status: error.status,
        raw: JSON.stringify(error)
      });
    });
}
exports.default = getGithubRepoMeta;
//# sourceMappingURL=get-github-repo-meta.js.map
