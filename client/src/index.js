import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import generateId from "cuid";
import "./index.css";
import { App } from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { store } from "./state/store";
import { requestApiMetadata, setRecipeId } from "./actions";
import { enableIframeCommunication } from "./extensionInterface/iframeCommunication";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

enableIframeCommunication();

store.dispatch(requestApiMetadata());
store.dispatch(setRecipeId(generateId()));
