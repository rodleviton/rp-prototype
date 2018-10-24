import { handleDocument } from "../../common";
import { IPixelsModel } from "reactive-pixels-common/models/PixelsModel";
import { DocumentSnapshot, Firestore } from "@google-cloud/firestore";

export default async function getPixelsById(id: string, db: Firestore) {
  const pixelsRef = db.collection("pixels").doc(id);

  try {
    const pixelsDataDocument: DocumentSnapshot = await pixelsRef.get();

    if (!pixelsDataDocument.exists) {
      throw new Error(`Cannot find pixels with provided ID - ${id}`);
    }

    return handleDocument(pixelsDataDocument) as IPixelsModel;
  } catch (error) {
    throw new Error(error);
  }
}
