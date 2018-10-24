import { Firestore, FieldValue } from "@google-cloud/firestore";
import { ApolloError } from "apollo-server-express";

type PixelsLikeActions = "add" | "remove";

export default async function updatePixelsLikes(
  pixelsId: string,
  authUserId: string,
  action: PixelsLikeActions,
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
  } catch (error) {
    throw new ApolloError(error);
  }
}
