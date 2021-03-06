import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { reducer } from "./reducer";
import { rootSaga } from "../effects/rootSaga";
import { iframeCommunicationReduxMiddleware } from "../extensionInterface/iframeCommunication";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware, iframeCommunicationReduxMiddleware())
  )
);

sagaMiddleware.run(rootSaga);
