"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handle_document_1 = require("./handle-document");
function sortCollectionByTimestamp(collection) {
  return collection.sort((a, b) => {
    return a.timestamp > b.timestamp ? -1 : 1;
  });
}
exports.sortCollectionByTimestamp = sortCollectionByTimestamp;
/**
 * Assigns document id to a collection of documents
 * @param querySnapshot
 */
function handleDocumentCollection(querySnapshot) {
  let collection = [];
  querySnapshot.forEach(doc => {
    collection = collection.concat([handle_document_1.handleDocument(doc)]);
  });
  return sortCollectionByTimestamp(collection);
}
exports.handleDocumentCollection = handleDocumentCollection;
//# sourceMappingURL=handle-document-collections.js.map
