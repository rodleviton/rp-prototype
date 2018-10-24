import fetchAuthenticatedUserSaga from "@modules/auth/daos/authSaga";
import fetchPixelsSaga from "@modules/pixels/daos/pixelsSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([fetchPixelsSaga(), fetchAuthenticatedUserSaga()]);
}
