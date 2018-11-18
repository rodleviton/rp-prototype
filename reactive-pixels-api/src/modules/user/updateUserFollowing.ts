import {
  Firestore,
  FieldValue,
  DocumentSnapshot
} from "@google-cloud/firestore";
import { ApolloError } from "apollo-server-express";
import { handleDocument } from "../common/helpers/handleDocument";
import { IUserModel } from "reactive-pixels-common/models/UserModel";

type UpdateUserFollowingMethod = "add" | "remove";

export default async function updateUserFollowing(
  userId: string,
  authUserId: string,
  method: UpdateUserFollowingMethod,
  db: Firestore
) {
  const userRef = db.collection("users").doc(authUserId);

  try {
    if (method === "add") {
      await userRef.update({
        following: FieldValue.arrayUnion(userId)
      });
    } else {
      await userRef.update({
        following: FieldValue.arrayRemove(userId)
      });
    }

    const userDataDocument: DocumentSnapshot = await userRef.get();
    const user = handleDocument(userDataDocument) as IUserModel;

    return user.following;
  } catch (error) {
    throw new ApolloError(error);
  }
}
