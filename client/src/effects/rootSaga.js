import { all } from "redux-saga/effects";
import { watchApiMetadataRequested } from "./apiMetadata";
import { watchImportIngredients } from "./importIngredients";
import { watchImportMethod } from "./importMethod";
import { watchLoadRecipes } from "./loadRecipes";

export function* rootSaga() {
  yield all([
    watchApiMetadataRequested(),
    watchLoadRecipes(),
    watchImportIngredients(),
    watchImportMethod()
  ]);
}
