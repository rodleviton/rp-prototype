import { getCollectionWithFilters } from "../common/helpers/getCollectionWithFilters";
import { handleDocumentCollection } from "../common/helpers/handleDocumentCollection";
import { IPixelsModel } from "reactive-pixels-common/models/PixelsModel";
import { QuerySnapshot, Firestore } from "@google-cloud/firestore";

enum GetPixelsFilters {
  username = "username"
}

export default async function getPixelsByUsername(
  username: string,
  db: Firestore
) {
  const userRef = getCollectionWithFilters(
    db,
    "pixels",
    { owner: username },
    GetPixelsFilters
  );

  try {
    const pixelsDataDocument: QuerySnapshot = await userRef.get();

    const pixels = handleDocumentCollection(pixelsDataDocument);

    if (!pixels) {
      throw new Error(`Cannot find any pixels for that username - ${username}`);
    }

    return pixels as [IPixelsModel];
  } catch (error) {
    throw new Error(error);
  }
}
