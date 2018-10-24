import { IAuthUserModel } from "reactive-pixels-common/models/AuthUserModel";
import { createAsyncAction, createStandardAction } from "typesafe-actions";

const PREFIX = "@@auth";

// ---------------- Like Auth User Pixels ------------------ //
/**
 * Note: this action is only triggered via proxy through the rootTransducer.
 * This avoids coupling actions between independent modules.
 */
interface IUpdateAuthUserLikedPixels {
  user: {
    id: string;
    likedPixels: string[];
  };
}

export const updateAuthUserLikedPixels = createStandardAction(
  `${PREFIX}/UPDATE_AUTH_USER_LIKED_PIXELS`
)<IUpdateAuthUserLikedPixels>();

// ---------------- INITIALISE SOCIAL AUTH ---------------- //

export interface IInitAuthUserSuccess {
  authToken: string;
  githubUserId: string;
  id: string;
  refreshToken: string;
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

// ---------------- Fetch Authenticated User ---------------- //

export interface IFetchAuthUserSuccess {
  readonly user: IAuthUserModel;
}

export const fetchAuthUser = createAsyncAction(
  `${PREFIX}/FETCH_AUTH_USER_REQUEST`,
  `${PREFIX}/FETCH_AUTH_USER_SUCCESS`,
  `${PREFIX}/FETCH_AUTH_USER_FAILURE`
)<void, IFetchAuthUserSuccess, Error>();
