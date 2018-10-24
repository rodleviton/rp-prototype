import { fetchAuthUser, initAuthUser } from "@modules/auth/daos/authActions";
import {
  buildCreatAuthUserUrl,
  buildFetchAuthUserUrl
} from "@modules/auth/helpers/urlBuilder";
import { get, post } from "@modules/common/api/async";
import { call, put, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";

export async function fetchAuthenticatedUserFromAPI(id: string) {
  const url = buildFetchAuthUserUrl(id);

  return get({ url });
}

export async function createAuthenticatedUserFromAPI(id: string) {
  const url = buildCreatAuthUserUrl(id);

  // We have all the information in the request headers to create/update a user
  return post({ url, data: null });
}

function* fetchAuthUserRequest(
  params: ActionType<typeof initAuthUser.success>
) {
  yield put({ type: getType(fetchAuthUser.request) });

  const { id, authToken, refreshToken, githubUserId } = params.payload;

  // TODO - add all User details to AuthUser??
  const [error, authUser] = yield call(createAuthenticatedUserFromAPI, id);

  if (authUser) {
    yield put({
      payload: {
        authToken,
        githubUserId,
        refreshToken,
        ...authUser.data
      },
      type: getType(fetchAuthUser.success)
    });
  }

  if (error) {
    yield put({ type: getType(fetchAuthUser.success) });
  }
}

export default function* fetchAuthenticatedUserSaga() {
  yield takeEvery(getType(initAuthUser.success), fetchAuthUserRequest);
}
