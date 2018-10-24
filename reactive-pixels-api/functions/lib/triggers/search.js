"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const algoliasearch = require("algoliasearch");
const ALGOLIA_ID = process.env.ALGOLIA_ID;
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;
const ALGOLIA_SEARCH_KEY = process.env.ALGOLIA_SEARCH_KEY;
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
exports.onPixelsCreated = event => {
  // Get the pixels document
  const pixels = event.data.data();
  // Add an 'objectID' field which Algolia requires
  pixels.objectID = event.params.pixelsId;
  // Write to the algolia index
  const index = client.initIndex("pixels");
  return index.saveObject({
    objectID: event.params.pixelsId,
    id: event.params.pixelsId,
    title: pixels.title,
    description: pixels.description,
    topics: pixels.topics,
    uid: pixels.uid,
    likes: pixels.likes,
    owner: pixels.owner,
    repo: pixels.repo,
    screenshot: `https://raw.githubusercontent.com/${pixels.owner}/${
      pixels.repo
    }/master/screenshot.jpg`
  });
};
exports.onUserCreated = event => {
  // Get the user document
  const user = event.data.data();
  // Add an 'objectID' field which Algolia requires
  user.objectID = event.params.userId;
  // Write to the algolia index
  const index = client.initIndex("users");
  return index.saveObject({
    objectID: event.params.userId,
    id: event.params.userId,
    username: user.username,
    displayName: user.displayName,
    githubUserId: user.githubUserId,
    location: user.location,
    avatar: `https://avatars.githubusercontent.com/u/${user.githubUserId}`
  });
};
//# sourceMappingURL=search.js.map
