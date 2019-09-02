import { all } from "redux-saga/effects";
import { watchApiMetadataRequested } from "./apiMetadata";
import { watchImportIngredients } from "./importIngredients";
import { watchImportMethod } from "./importMethod";
import { watchLoadRecipes } from "./loadRecipes";
import { watchLoadRecipeById } from "./loadRecipeById";
import { watchLoadRecipeByURL } from "./loadRecipeByURL";

export function* rootSaga() {
  yield all([
    watchApiMetadataRequested(),
    watchLoadRecipes(),
    watchImportIngredients(),
    watchImportMethod(),
    watchLoadRecipeById(),
    watchLoadRecipeByURL()
  ]);
}
