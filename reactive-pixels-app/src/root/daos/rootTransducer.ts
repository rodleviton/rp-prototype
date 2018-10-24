import { updateAuthUserLikedPixels } from "@modules/auth/daos/authActions";
import { showNotification } from "@modules/notifications/daos/notificationActions";
import { likePixels } from "@modules/pixels/daos/pixelsActions";
import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux";
import { getType } from "typesafe-actions";

function rootTransducer() {
  const rootTransducerMiddleware: Middleware = ({
    getState,
    dispatch
  }: MiddlewareAPI<any>) => (next: Dispatch<AnyAction>) => (action: any) => {
    /* AUTH REQUIRED */
    if (action.type === getType(likePixels.request)) {
      const { user } = getState().auth;

      if (!user.id) {
        dispatch(showNotification("Auth"));
        return;
      }
    }

    /* LIKE PIXELS */
    if (action.type === getType(likePixels.success)) {
      dispatch(updateAuthUserLikedPixels(action.payload));
    }

    next(action);
  };

  return rootTransducerMiddleware;
}

export default rootTransducer;
