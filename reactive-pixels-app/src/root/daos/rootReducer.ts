import authReducer from "@modules/auth/daos/authReducer";
import notificationReducer from "@modules/notifications/daos/notificationReducer";
import { combineReducers, Reducer } from "redux";
import { StateType } from "typesafe-actions";

const rootReducer: Reducer<IRootState> = combineReducers({
  auth: authReducer,
  notifications: notificationReducer
});

export interface IRootState {
  auth: StateType<typeof authReducer>;
  notifications: StateType<typeof notificationReducer>;
}

export default rootReducer;
