import * as authActions from "@modules/auth/daos/authActions";
import { IAuthUserModel } from "reactive-pixels-common/models/AuthUserModel";
import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";

export type AuthAction = ActionType<typeof authActions>;

const { updateAuthUserLikedPixels, fetchAuthUser } = authActions;

export interface IAuthState {
  readonly user: IAuthUserModel;
}

export const initialState: IAuthState = {
  user: {} as IAuthUserModel
};

export default combineReducers<IAuthState>({
  user: (state = initialState.user, action) => {
    switch (action.type) {
      case getType(fetchAuthUser.request):
        return {}; // clear out existing data

      case getType(fetchAuthUser.success):
        return action.payload;

      case getType(fetchAuthUser.failure):
        return state;

      // ---------------- Like Pixels ------------------ //

      case getType(updateAuthUserLikedPixels): {
        const { id, likedPixels } = action.payload.user;

        if (state.id === id) {
          return {
            ...state,
            likedPixels
          };
        }

        return state;
      }
      default:
        return state;
    }
  }
});
