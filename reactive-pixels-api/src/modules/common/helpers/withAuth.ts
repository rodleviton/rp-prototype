import * as admin from "firebase-admin";
import { ApolloError, AuthenticationError } from "apollo-server-express";
import {
  FirebaseApiResponseCodes,
  FirebaseApiResponseTypes
} from "../../../models";

export interface IdToken {
  iss: string;
  name: string;
  picture: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: boolean;
  firebase: {
    identities: object;
    sign_in_provider: string;
  };
  uid: string;
}

export default async function withAuth(authorization: string) {
  if (authorization && authorization.startsWith("Bearer ")) {
    // Read the ID Token from the Authorization header.
    const idToken = authorization.split("Bearer ")[1];

    try {
      // decode the id token
      return admin.auth().verifyIdToken(idToken);
    } catch (error) {
      new ApolloError(
        FirebaseApiResponseTypes[error.codePrefix],
        FirebaseApiResponseCodes[error.codePrefix],
        { raw: JSON.stringify(error) }
      );
    }
  }

  throw new AuthenticationError(
    "User must be authenticated to perform this operation"
  );
}
