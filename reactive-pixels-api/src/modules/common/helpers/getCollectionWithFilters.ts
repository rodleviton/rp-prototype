import { Request } from "express";

/**
 * Utility to extract allowed filter from request and construct Firebase data query
 * @param db - Firestore instance
 * @param collectionName - collection to construct Firebase query from
 * @param query - the request query params
 * @param allowedFilters - allowed filter query params
 */
export function getCollectionWithFilters(
  db: any,
  collectionName: string,
  query: Request["query"],
  allowedFilters: object
) {
  let DBQuery: any = db.collection(collectionName);
  const filters: string[] = Object.keys(query);

  if (filters.length) {
    filters.forEach((filter: string) => {
      if (allowedFilters[filter]) {
        DBQuery = DBQuery.where(allowedFilters[filter], "==", query[filter]);
      }
    });
  }

  return DBQuery;
}
