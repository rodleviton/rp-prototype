"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filterDocument(doc, validKeys) {
  const clonedDoc = Object.assign({}, doc); // deep merge?
  const docKeys = Object.keys(clonedDoc);
  docKeys.forEach(key => {
    if (validKeys.indexOf(key) === -1) {
      delete clonedDoc[key];
    }
  });
  return clonedDoc;
}
exports.filterDocument = filterDocument;
//# sourceMappingURL=filter-document.js.map
