import * as pixelsSceneActions from "@root/scenes/PixelsScene/daos/pixelsSceneActions";
import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";

export type PixelsSceneAction = ActionType<typeof pixelsSceneActions>;

const { hideCodePanel, showCodePanel } = pixelsSceneActions;

export interface IPixelsSceneState {
  readonly isCodePanelActive: boolean;
}

export const initialState: IPixelsSceneState = {
  isCodePanelActive: false
};

export default combineReducers<IPixelsSceneState>({
  isCodePanelActive: (state = initialState.isCodePanelActive, action) => {
    switch (action.type) {
      case getType(showCodePanel):
        return {
          isCodePanelActive: true
        };

      case getType(hideCodePanel):
        return {
          isCodePanelActive: false
        };

      default:
        return state;
    }
  }
});
