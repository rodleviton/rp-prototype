import { IAuthUserModel } from "reactive-pixels-common/models/AuthUserModel";
import { createAsyncAction, createStandardAction } from "typesafe-actions";

const PREFIX = "@@auth";

// ---------------- INITIALISE SOCIAL AUTH ---------------- //

// These action specifically cover the social auth provider flow (Github)
// Once we have the initial social auth data we
// can then go and fetch the auth user
export const initAuthUser = createAsyncAction(
  `${PREFIX}/INIT_AUTH_USER_REQUEST`,
  `${PREFIX}/INIT_AUTH_USER_SUCCESS`,
  `${PREFIX}/INIT_AUTH_USER_FAILURE`
)<void, IAuthUserModel, Error>();

export const logoutAuthUser = createStandardAction(
  `${PREFIX}/LOGOUT_AUTH_USER`
)<void>();
