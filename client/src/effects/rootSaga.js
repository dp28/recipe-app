import { all } from "redux-saga/effects";
import { watchApiMetadataRequested } from "./apiMetadata";
import { watchImportIngredients } from "./importIngredients";

export function* rootSaga() {
  yield all([watchApiMetadataRequested(), watchImportIngredients()]);
}
