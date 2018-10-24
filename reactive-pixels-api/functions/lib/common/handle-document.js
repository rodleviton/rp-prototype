"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Assigns document id to document
 * @param doc
 */
function handleDocument(doc) {
  return Object.assign({}, doc.data(), { id: doc.id });
}
exports.handleDocument = handleDocument;
//# sourceMappingURL=handle-document.js.map
