import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchRecipeByURL,
  GET_RECIPE_BY_URL,
  watchLoadRecipeByURL
} from "./loadRecipeByURL";
import { performQuery } from "./performQuery";
import {
  errorLoadingRecipe,
  recipeLoaded,
  LOAD_RECIPE_BY_URL,
  loadRecipeByURL
} from "../actions";

describe("fetchRecipeByURL", () => {
  it(`should query the API`, () => {
    const generator = fetchRecipeByURL({ url: "fake" });
    expect(generator.next().value).toEqual(
      call(performQuery, GET_RECIPE_BY_URL, { url: "fake" })
    );
  });

  describe("when the API call succeeds", () => {
    it("should dispatch a recipeLoaded action with the version", () => {
      const generator = fetchRecipeByURL({ url: "fake" });
      const recipe = { id: "fake", title: "Burnt toast" };
      generator.next();
      expect(generator.next({ recipe }).value).toEqual(
        put(recipeLoaded(recipe))
      );
    });
  });

  describe("when the API call fails", () => {
    it("should dispatch a errorLoadingRecipe action with the error", () => {
      const generator = fetchRecipeByURL({ url: "fake" });
      const error = new Error();
      generator.next();
      expect(generator.throw(error).value).toEqual(
        put(errorLoadingRecipe(error))
      );
    });
  });
});

describe("watchLoadRecipeByURL", () => {
  it(`should delegate ${LOAD_RECIPE_BY_URL} actions to fetchRecipeByURL`, () => {
    const generator = watchLoadRecipeByURL();
    expect(generator.next(loadRecipeByURL({ url: "fake" })).value).toEqual(
      takeLatest(LOAD_RECIPE_BY_URL, fetchRecipeByURL)
    );
  });
});
