"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Utility to extract allowed filter from request and construct Firebase data query
 * @param db - Firestore instance
 * @param collectionName - collection to construct Firebase query from
 * @param query - the request query params
 * @param allowedFilters - allowed filter query params
 */
function getCollectionWithFilters(db, collectionName, query, allowedFilters) {
  let DBQuery = db.collection(collectionName);
  const filters = Object.keys(query);
  if (filters.length) {
    filters.forEach(filter => {
      if (allowedFilters[filter]) {
        DBQuery = DBQuery.where(allowedFilters[filter], "==", query[filter]);
      }
    });
  }
  return DBQuery;
}
exports.getCollectionWithFilters = getCollectionWithFilters;
//# sourceMappingURL=get-collection-with-filters.js.map
