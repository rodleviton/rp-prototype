import {
  Firestore,
  FieldValue,
  DocumentSnapshot
} from "@google-cloud/firestore";
import { ApolloError } from "apollo-server-express";
import { handleDocument } from "../common/helpers/handleDocument";
import { IUserModel } from "reactive-pixels-common/models/UserModel";

type UpdateUserLikedPixelsMethod = "add" | "remove";

export default async function updatePixelsLikes(
  pixelsId: string,
  authUserId: string,
  method: UpdateUserLikedPixelsMethod,
  db: Firestore
) {
  const userRef = db.collection("users").doc(authUserId);

  try {
    if (method === "add") {
      await userRef.update({
        likedPixels: FieldValue.arrayUnion(pixelsId)
      });
    } else {
      await userRef.update({
        likedPixels: FieldValue.arrayRemove(pixelsId)
      });
    }

    const userDataDocument: DocumentSnapshot = await userRef.get();
    const user = handleDocument(userDataDocument) as IUserModel;

    // We return the array of updated pixels likes
    return user.likedPixels;
  } catch (error) {
    throw new ApolloError(error);
  }
}
