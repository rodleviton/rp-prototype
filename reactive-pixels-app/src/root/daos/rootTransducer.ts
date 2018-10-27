// import { showNotification } from "@modules/notifications/daos/notificationActions";
// import { likePixels } from "@modules/pixels/daos/pixelsActions";
import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux";
// import { getType } from "typesafe-actions";

function rootTransducer() {
  const rootTransducerMiddleware: Middleware = ({
    getState,
    dispatch
  }: MiddlewareAPI<any>) => (next: Dispatch<AnyAction>) => (action: any) => {
    // if (action.type === getType(likePixels.request)) {
    //   const { user } = getState().auth;

    //   if (!user.id) {
    //     dispatch(showNotification("Auth"));
    //     return;
    //   }
    // }

    next(action);
  };

  return rootTransducerMiddleware;
}

export default rootTransducer;
