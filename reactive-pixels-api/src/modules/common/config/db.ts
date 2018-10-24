import * as admin from "firebase-admin";
import { resolvePath } from "./paths";

if (process.env.NODE_ENV !== "production") {
  // !!NEVER DEPLOY SERVICE ACCOUNT KEY!!
  const serviceAccount = resolvePath("serviceAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
  });
} else {
  // APP Engine will take care of credentials
  admin.initializeApp();
}

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };

firestore.settings(settings);

export default firestore;
