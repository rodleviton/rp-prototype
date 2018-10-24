import { ApiMethods } from "@modules/common/api/apiConstants";
import { get, request } from "@modules/common/api/async";
import {
  fetchPixels,
  fetchPixelsComments,
  fetchPixelsMeta,
  likePixels
} from "@modules/pixels/daos/pixelsActions";
import {
  buildFetchPixelsCommentsUrl,
  buildFetchPixelsMetaUrl,
  buildFetchPixelsUrl,
  buildLikePixelsUrl
} from "@modules/pixels/helpers/urlBuilder";
import { pixelsDataToPixelsTransformer } from "@modules/pixels/mappers/PixelsDataToPixelsTransformerFactory";
import { call, put, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";

// ---------------- Fetch Pixels ---------------- //

export async function fetchPixelsFromAPI(pixelsId?: string, owner?: string) {
  const url = buildFetchPixelsUrl(pixelsId, owner);

  return get({ url });
}

function* fetchPixelsRequest(params: ActionType<typeof fetchPixels.request>) {
  const { id, owner } = params.payload;
  const [error, pixels] = yield call(fetchPixelsFromAPI, id, owner);

  if (pixels) {
    let pixelsData;

    // Run some data type checks
    if (pixels && Array.isArray(pixels.data) && pixels.data.length > 0) {
      pixelsData = pixels.data;
    } else if (pixels && !Array.isArray(pixels.data) && pixels.data) {
      pixelsData = [pixels.data];
    } else {
      pixelsData = [];
    }

    yield put({
      payload: pixelsDataToPixelsTransformer.convertMultiple(pixelsData),
      type: getType(fetchPixels.success)
    });
  }

  if (error) {
    yield put({ type: getType(fetchPixels.failure) });
  }
}

// ---------------- Like Pixels ------------------ //

async function likePixelsFromAPI(pixelsId: string, method: ApiMethods) {
  const url = buildLikePixelsUrl(pixelsId);

  return request({ method, url });
}

function* likePixelsRequest(params: ActionType<typeof likePixels.request>) {
  const { method, pixelsId } = params.payload;
  const [error, result] = yield call(likePixelsFromAPI, pixelsId, method);

  if (result) {
    yield put({
      payload: result.data,
      type: getType(likePixels.success)
    });
  }

  if (error) {
    yield put({ type: getType(likePixels.failure) });
  }
}

// ---------------- Fetch Pixels Meta ---------------- //

export async function fetchPixelsMetaFromAPI(pixelsId: string) {
  const url = buildFetchPixelsMetaUrl(pixelsId);

  return get({ url });
}

function* fetchPixelsMetaRequest(
  params: ActionType<typeof fetchPixelsMeta.request>
) {
  const { id } = params.payload;
  const [error, pixelsMeta] = yield call(fetchPixelsMetaFromAPI, id);

  if (pixelsMeta) {
    yield put({
      payload: pixelsMeta.data,
      type: getType(fetchPixelsMeta.success)
    });
  }

  if (error) {
    yield put({ type: getType(fetchPixelsMeta.failure) });
  }
}

// ---------------- Fetch Pixels Comments ---------------- //

export async function fetchPixelsCommentsFromAPI(pixelsId: string) {
  const url = buildFetchPixelsCommentsUrl(pixelsId);

  return get({ url });
}

function* fetchPixelsCommentsRequest(
  params: ActionType<typeof fetchPixelsComments.request>
) {
  const { id } = params.payload;
  const [error, pixelsComments] = yield call(fetchPixelsCommentsFromAPI, id);

  if (pixelsComments) {
    yield put({
      payload: pixelsComments.data,
      type: getType(fetchPixelsComments.success)
    });
  }

  if (error) {
    yield put({ type: getType(fetchPixelsComments.failure) });
  }
}

export default function* fetchPixelsSaga() {
  yield takeEvery(getType(fetchPixels.request), fetchPixelsRequest);
  yield takeEvery(getType(likePixels.request), likePixelsRequest);
  yield takeEvery(getType(fetchPixelsMeta.request), fetchPixelsMetaRequest);
  yield takeEvery(
    getType(fetchPixelsComments.request),
    fetchPixelsCommentsRequest
  );
}
