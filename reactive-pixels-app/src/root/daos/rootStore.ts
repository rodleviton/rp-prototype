import * as firebase from "firebase/app";
import { applyMiddleware, createStore, Store } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import thunkMiddleware from "redux-thunk";
import { config } from "./rootConfig";
import rootReducer, { IRootState } from "./rootReducer";
import rootSaga from "./rootSaga";
import rootTransducer from "./rootTransducer";

const firebaseConfig = firebase.initializeApp(config);

function configureStore(initialState?: object): Store<IRootState> {
  const loggerMiddleware = createLogger();
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    {} as IRootState,
    applyMiddleware(
      rootTransducer(),
      sagaMiddleware,
      thunkMiddleware.withExtraArgument(firebaseConfig),
      loggerMiddleware
    )
  );
  sagaMiddleware.run(rootSaga);

  return store;
}

// export store singleton instance
export default configureStore();
