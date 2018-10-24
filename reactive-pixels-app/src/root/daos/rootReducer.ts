import authReducer from "@modules/auth/daos/authReducer";
import notificationReducer from "@modules/notifications/daos/notificationReducer";
import pixelsReducer from "@modules/pixels/daos/pixelsReducer";
import pixelsSceneReducer from "@root/scenes/PixelsScene/daos/pixelsSceneReducer";
import { combineReducers, Reducer } from "redux";
import { StateType } from "typesafe-actions";

const rootReducer: Reducer<IRootState> = combineReducers({
  auth: authReducer,
  notifications: notificationReducer,
  pixels: pixelsReducer,
  scenes: combineReducers({
    pixels: pixelsSceneReducer
  })
});

export interface IRootState {
  auth: StateType<typeof authReducer>;
  notifications: StateType<typeof notificationReducer>;
  pixels: StateType<typeof pixelsReducer>;
  scenes: {
    pixels: StateType<typeof pixelsSceneReducer>;
  };
}

export default rootReducer;
