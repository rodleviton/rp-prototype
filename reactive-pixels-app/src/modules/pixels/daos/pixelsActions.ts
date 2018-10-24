import { ApiMethods } from "@modules/common/api/apiConstants";
import { IPixelsCommentModel } from "reactive-pixels-common/models/PixelsCommentModel";
import { IPixelsMetadataModel } from "reactive-pixels-common/models/PixelsMetadataModel";
import { IPixelsModel } from "reactive-pixels-common/models/PixelsModel";
import { createAsyncAction, createStandardAction } from "typesafe-actions";

// ---------------- Like Pixels ------------------ //
interface ILikePixelsRequest {
  pixelsId: string;
  userId: string;
  method: ApiMethods.Delete | ApiMethods.Post;
}

const PREFIX = "@@pixels";

export const likePixels = createAsyncAction(
  `${PREFIX}/LIKE_PIXELS_REQUEST`,
  `${PREFIX}/LIKE_PIXELS_SUCCESS`,
  `${PREFIX}/LIKE_PIXELS_FAILURE`
)<ILikePixelsRequest, void, Error>();

// ---------------- Fetch Pixels ---------------- //
interface IFetchPixelsRequest {
  id?: string;
  owner?: string;
}

export interface IFetchPixelsSuccess {
  readonly allIds: ReadonlyArray<string>;
  readonly itemsById: { [id: string]: IPixelsModel };
}

export const fetchPixels = createAsyncAction(
  `${PREFIX}/FETCH_PIXELS_REQUEST`,
  `${PREFIX}/FETCH_PIXELS_SUCCESS`,
  `${PREFIX}/FETCH_PIXELS_FAILURE`
)<IFetchPixelsRequest, IFetchPixelsSuccess, Error>();

// ---------------- Select Pixels ---------------- //

export const selectPixels = createStandardAction(`${PREFIX}/SELECT_PIXELS`)<
  string
>();

// ---------------- Fetch Pixels Meta ---------------- //
interface IFetchPixelsMetaRequest {
  id?: string;
}

export interface IFetchPixelsMetaSuccess {
  readonly meta: IPixelsMetadataModel;
}

export const fetchPixelsMeta = createAsyncAction(
  `${PREFIX}/FETCH_PIXELS_META_REQUEST`,
  `${PREFIX}/FETCH_PIXELS_META_SUCCESS`,
  `${PREFIX}/FETCH_PIXELS_META_FAILURE`
)<IFetchPixelsMetaRequest, IFetchPixelsMetaSuccess, Error>();

// ---------------- Fetch Pixels Comments ---------------- //
interface IFetchPixelsCommentsRequest {
  id?: string;
}

export interface IFetchPixelsCommentsSuccess {
  readonly comments: IPixelsCommentModel[];
}

export const fetchPixelsComments = createAsyncAction(
  `${PREFIX}/FETCH_PIXELS_COMMENTS_REQUEST`,
  `${PREFIX}/FETCH_PIXELS_COMMENTS_SUCCESS`,
  `${PREFIX}/FETCH_PIXELS_COMMENTS_FAILURE`
)<IFetchPixelsCommentsRequest, IFetchPixelsCommentsSuccess, Error>();
