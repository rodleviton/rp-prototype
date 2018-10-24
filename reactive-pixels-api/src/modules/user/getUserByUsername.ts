import {
  getCollectionWithFilters,
  handleDocumentCollection
} from "../../common";
import { IUserModel } from "reactive-pixels-common/models/UserModel";
import { QuerySnapshot, Firestore } from "@google-cloud/firestore";
import { ApolloError } from "apollo-server-express";

enum GetUsersFilters {
  username = "username"
}

export default async function getUserByUsername(
  username: string,
  db: Firestore
) {
  const userRef = getCollectionWithFilters(
    db,
    "users",
    { username },
    GetUsersFilters
  );

  try {
    const userDataDocument: QuerySnapshot = await userRef.get();

    const user = handleDocumentCollection(userDataDocument)[0];

    if (!user) {
      throw new Error(`Cannot find user with provided username - ${username}`);
    }

    return user as IUserModel;
  } catch (error) {
    throw new ApolloError(error);
  }
}
