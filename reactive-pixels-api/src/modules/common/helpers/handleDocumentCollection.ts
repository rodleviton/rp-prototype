import { handleDocument } from "./handleDocument";
import { QuerySnapshot } from "@google-cloud/firestore";

export function sortCollectionByTimestamp(collection) {
  return collection.sort((a, b) => {
    return a.timestamp > b.timestamp ? -1 : 1;
  });
}

/**
 * Assigns document id to a collection of documents
 * @param querySnapshot
 */
export function handleDocumentCollection(querySnapshot: QuerySnapshot) {
  let collection: any[] = [];

  querySnapshot.forEach((doc: any) => {
    collection = collection.concat([handleDocument(doc)]);
  });

  return collection;
}
