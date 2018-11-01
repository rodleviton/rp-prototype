import {
  Firestore,
  FieldValue,
  DocumentSnapshot
} from "@google-cloud/firestore";
import { ApolloError } from "apollo-server-express";
import { handleDocument } from "../common/helpers/handleDocument";
import { IPixelsModel } from "reactive-pixels-common/models/PixelsModel";

type UpdatePixelsLikesMethod = "add" | "remove";

export default async function updatePixelsLikes(
  pixelsId: string,
  authUserId: string,
  action: UpdatePixelsLikesMethod,
  db: Firestore
) {
  const pixelsRef = db.collection("pixels").doc(pixelsId);

  try {
    if (action === "add") {
      await pixelsRef.update({
        likes: FieldValue.arrayUnion(authUserId)
      });
    } else {
      await pixelsRef.update({
        likes: FieldValue.arrayRemove(authUserId)
      });
    }

    const pixelsDataDocument: DocumentSnapshot = await pixelsRef.get();
    const pixels = handleDocument(pixelsDataDocument) as IPixelsModel;

    // We return the array of updated pixels likes
    return pixels.likes;
  } catch (error) {
    throw new ApolloError(error);
  }
}
