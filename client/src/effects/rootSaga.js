import { all } from "redux-saga/effects";
import { watchApiMetadataRequested } from "./apiMetadata";

export function* rootSaga() {
  yield all([watchApiMetadataRequested]);
}
