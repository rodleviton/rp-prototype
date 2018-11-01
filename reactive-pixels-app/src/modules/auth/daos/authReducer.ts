import * as authActions from "@modules/auth/daos/authActions";
import { IAuthUserModel } from "reactive-pixels-common/models/AuthUserModel";
import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";

export type AuthAction = ActionType<typeof authActions>;

const { initAuthUser, logoutAuthUser } = authActions;

export interface IAuthState {
  readonly user: IAuthUserModel;
}

export const initialState: IAuthState = {
  user: {} as IAuthUserModel
};

export default combineReducers<IAuthState>({
  user: (state = initialState.user, action) => {
    switch (action.type) {
      case getType(initAuthUser.request):
        return {}; // clear out existing data

      case getType(initAuthUser.success):
        return action.payload;

      case getType(initAuthUser.failure):
        return state;

      case getType(logoutAuthUser):
        return {}; // clear out existing data

      default:
        return state;
    }
  }
});
