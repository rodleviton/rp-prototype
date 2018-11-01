import { handleDocumentCollection } from "../common/helpers/handleDocumentCollection";
import { IPixelsCommentModel } from "reactive-pixels-common/models/PixelsCommentModel";
import { QuerySnapshot, Firestore } from "@google-cloud/firestore";

export default async function getPixelsComments(id: string, db: Firestore) {
  const pixelsRef = db
    .collection("pixels")
    .doc(id)
    .collection("comments");

  try {
    const pixelsDataDocument: QuerySnapshot = await pixelsRef
      .orderBy("timestamp", "desc")
      .get();

    return handleDocumentCollection(pixelsDataDocument) as [
      IPixelsCommentModel
    ];
  } catch (error) {
    throw new Error(error);
  }
}
