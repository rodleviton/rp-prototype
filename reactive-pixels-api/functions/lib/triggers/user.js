"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const github_actions_1 = require("../github-actions");
exports.onUserAuth = async (event, db) => {
  const user = event.data;
  const providerData = user.providerData[0];
  const githubUser = await github_actions_1.getGithubUser({
    id: providerData.uid
  });
  const userData = {
    githubUserId: providerData.uid,
    username: githubUser.data.username,
    displayName: providerData.displayName || githubUser.data.username,
    email: providerData.email,
    following: [],
    followers: [],
    likedPixels: [],
    location: githubUser.data.location,
    creationTime: Date.now(),
    lastSignInTime: Date.now()
  };
  return db
    .collection("users")
    .doc(user.uid)
    .set(userData, { merge: true });
};
//# sourceMappingURL=user.js.map
