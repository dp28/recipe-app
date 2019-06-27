import { takeLatest } from "redux-saga/effects";
import { watchApiMetadataRequested } from "./apiMetadata";
import { REQUEST_API_METADATA } from "../actions";

export function* rootSaga() {
  yield takeLatest(REQUEST_API_METADATA, watchApiMetadataRequested);
}
