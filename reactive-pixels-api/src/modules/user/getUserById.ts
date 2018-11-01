import { handleDocument } from "../common/helpers/handleDocument";
import { DocumentSnapshot, Firestore } from "@google-cloud/firestore";
import { ApolloError } from "apollo-server-express";
import { IUserModel } from "reactive-pixels-common/models/UserModel";
import { ApiResponseCodes } from "../common/constants";

export default async function getUserById(id: string, db: Firestore) {
  const userRef = db.collection("users").doc(id);

  try {
    const userDocumentData: DocumentSnapshot = await userRef.get();

    if (!userDocumentData.exists) {
      throw new ApolloError(
        `Cannot find user with provided ID - ${id}`,
        `${ApiResponseCodes.NotFound}`
      );
    }

    return handleDocument(userDocumentData) as IUserModel;
  } catch (error) {
    throw new ApolloError(error);
  }
}
