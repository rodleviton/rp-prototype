import {
  Firestore,
  FieldValue,
  DocumentSnapshot
} from "@google-cloud/firestore";
import { ApolloError } from "apollo-server-express";
import { handleDocument } from "../common/helpers/handleDocument";
import { IUserModel } from "reactive-pixels-common/models/UserModel";

type UpdateUserFollowersMethod = "add" | "remove";

export default async function updateUserFollowers(
  userId: string,
  authUserId: string,
  action: UpdateUserFollowersMethod,
  db: Firestore
) {
  const userRef = db.collection("users").doc(userId);

  try {
    if (action === "add") {
      await userRef.update({
        followers: FieldValue.arrayUnion(authUserId)
      });
    } else {
      await userRef.update({
        followers: FieldValue.arrayRemove(authUserId)
      });
    }

    const userDataDocument: DocumentSnapshot = await userRef.get();
    const user = handleDocument(userDataDocument) as IUserModel;

    return user.followers;
  } catch (error) {
    throw new ApolloError(error);
  }
}
