import { all } from "redux-saga/effects";
import { watchApiMetadataRequested } from "./apiMetadata";
import { watchImportIngredients } from "./importIngredients";
import { watchImportMethod } from "./importMethod";

export function* rootSaga() {
  yield all([
    watchApiMetadataRequested(),
    watchImportIngredients(),
    watchImportMethod()
  ]);
}
