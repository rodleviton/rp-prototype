import { IAuthUserModel } from "reactive-pixels-common/models/AuthUserModel";
import { createAsyncAction } from "typesafe-actions";

const PREFIX = "@@auth";

// ---------------- INITIALISE SOCIAL AUTH ---------------- //

export interface IInitAuthUserSuccess {
  readonly user: IAuthUserModel;
}

// These action specifically cover the social auth provider flow
// Github...
// Once we have the initial social auth data we
// can then go and fetch the auth user
export const initAuthUser = createAsyncAction(
  `${PREFIX}/INIT_AUTH_USER_REQUEST`,
  `${PREFIX}/INIT_AUTH_USER_SUCCESS`,
  `${PREFIX}/INIT_AUTH_USER_FAILURE`
)<void, IInitAuthUserSuccess, Error>();
