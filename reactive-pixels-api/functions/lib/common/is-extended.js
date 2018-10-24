"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Return extended project information
function isExtended(request) {
  return request.query.extended && request.query.extended === "true";
}
exports.isExtended = isExtended;
//# sourceMappingURL=is-extended.js.map
