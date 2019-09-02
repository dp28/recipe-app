import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchRecipeById,
  GET_RECIPE_BY_ID,
  watchLoadRecipeById
} from "./loadRecipeById";
import { performQuery } from "./performQuery";
import {
  errorLoadingRecipe,
  recipeLoaded,
  LOAD_RECIPE_BY_ID,
  loadRecipeById
} from "../actions";

describe("fetchRecipeById", () => {
  it(`should query the API`, () => {
    const generator = fetchRecipeById({ id: "fake" });
    expect(generator.next().value).toEqual(
      call(performQuery, GET_RECIPE_BY_ID, { id: "fake" })
    );
  });

  describe("when the API call succeeds", () => {
    it("should dispatch a recipeLoaded action with the version", () => {
      const generator = fetchRecipeById({ id: "fake" });
      const recipe = { id: "fake", title: "Burnt toast" };
      generator.next();
      expect(generator.next({ recipe }).value).toEqual(
        put(recipeLoaded(recipe))
      );
    });
  });

  describe("when the API call fails", () => {
    it("should dispatch a errorLoadingRecipe action with the error", () => {
      const generator = fetchRecipeById({ id: "fake" });
      const error = new Error();
      generator.next();
      expect(generator.throw(error).value).toEqual(
        put(errorLoadingRecipe(error))
      );
    });
  });
});

describe("watchLoadRecipeById", () => {
  it(`should delegate ${LOAD_RECIPE_BY_ID} actions to fetchRecipeById`, () => {
    const generator = watchLoadRecipeById();
    expect(generator.next(loadRecipeById({ id: "fake" })).value).toEqual(
      takeLatest(LOAD_RECIPE_BY_ID, fetchRecipeById)
    );
  });
});
