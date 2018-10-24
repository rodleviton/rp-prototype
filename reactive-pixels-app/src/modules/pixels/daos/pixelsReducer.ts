import { ApiMethods } from "@modules/common/api/apiConstants";
import {
  addItemToArray,
  removeItemFromArray
} from "@modules/common/utils/arrayUtilities";
import * as pixelsActions from "@modules/pixels/daos/pixelsActions";
import { IPixelsCommentModel } from "reactive-pixels-common/models/PixelsCommentModel";
import { IPixelsMetadataModel } from "reactive-pixels-common/models/PixelsMetadataModel";
import { IPixelsModel } from "reactive-pixels-common/models/PixelsModel";
import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";

export type PixelsAction = ActionType<typeof pixelsActions>;

const {
  fetchPixels,
  fetchPixelsComments,
  fetchPixelsMeta,
  likePixels,
  selectPixels
} = pixelsActions;

export interface IPixelsState {
  readonly allIds: ReadonlyArray<string>;
  readonly itemsById: { [id: string]: IPixelsModel };
  readonly selected: {
    comments: IPixelsCommentModel[];
    id: string;
    meta: IPixelsMetadataModel | {};
  };
}

export const initialState: IPixelsState = {
  allIds: [],
  itemsById: {},
  selected: {
    comments: [],
    id: "",
    meta: {}
  }
};

export default combineReducers<IPixelsState>({
  allIds: (state = initialState.allIds, action) => {
    switch (action.type) {
      case getType(fetchPixels.request):
        return []; // clear out existing data

      case getType(fetchPixels.success):
        return action.payload.allIds;

      case getType(fetchPixels.failure):
        return state;

      default:
        return state;
    }
  },
  itemsById: (state = initialState.itemsById, action) => {
    // ---------------- Fetch Pixels ---------------- //

    switch (action.type) {
      case getType(fetchPixels.request):
        return {}; // clear out existing data

      case getType(fetchPixels.success):
        return action.payload.itemsById;

      case getType(fetchPixels.failure):
        return state;

      // ---------------- Like Pixels ------------------ //

      case getType(likePixels.request): {
        const { method, pixelsId, userId } = action.payload;
        // Here we optimistically update the state
        // TODO - UPDATE STATE ON SUCCESS/FAILURE to ensure state is always in sync
        const updatedLikes =
          method === ApiMethods.Delete
            ? removeItemFromArray(state[pixelsId].likes, userId)
            : addItemToArray(state[pixelsId].likes, userId);

        return {
          ...state,
          [pixelsId]: {
            ...state[pixelsId],
            likes: updatedLikes
          }
        };
      }

      default:
        return state;
    }
  },
  selected: (state = initialState.selected, action) => {
    switch (action.type) {
      // select
      case getType(selectPixels):
        return {
          comments: [],
          id: action.payload,
          meta: {}
        };

      // comments
      case getType(fetchPixelsComments.success):
        return {
          comments: action.payload,
          id: state.id,
          meta: state.meta
        };

      // meta
      case getType(fetchPixelsMeta.success):
        return {
          comments: state.comments,
          id: state.id,
          meta: action.payload
        };

      default:
        return state;
    }
  }
});
