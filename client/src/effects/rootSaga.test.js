import { all } from "redux-saga/effects";
import { rootSaga } from "./rootSaga";
import { watchApiMetadataRequested } from "./apiMetadata";
import { watchImportIngredients } from "./importIngredients";
import { watchImportMethod } from "./importMethod";
import { watchLoadRecipes } from "./loadRecipes";
import { watchLoadRecipeById } from "./loadRecipeById";
import { watchLoadRecipeByURL } from "./loadRecipeByURL";
import { watchSaveRecipe } from "./saveRecipe";
import { watchStartTimer } from "./timers";
import { watchImportActions } from "./importFlow";

describe("rootSaga", () => {
  it(`should delegate to watchApiMetadataRequested and watchImportIngredients`, () => {
    const generator = rootSaga();
    expect(generator.next().value).toEqual(
      all([
        watchApiMetadataRequested(),
        watchLoadRecipes(),
        watchImportIngredients(),
        watchImportMethod(),
        watchLoadRecipeById(),
        watchLoadRecipeByURL(),
        watchSaveRecipe(),
        watchStartTimer(),
        watchImportActions()
      ])
    );
  });
});
