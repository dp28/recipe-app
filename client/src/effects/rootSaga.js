import { takeLatest } from "redux-saga/effects";
import { watchVersionRequested } from "./versions";
import { REQUEST_VERSION } from "../actions";

export function* rootSaga() {
  yield takeLatest(REQUEST_VERSION, watchVersionRequested);
}
