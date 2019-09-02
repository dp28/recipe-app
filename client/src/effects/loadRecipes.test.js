import { call, put, takeLatest } from "redux-saga/effects";
import { fetchRecipes, GET_RECIPES, watchLoadRecipes } from "./loadRecipes";
import { performQuery } from "./performQuery";
import {
  errorLoadingRecipes,
  recipesLoaded,
  LOAD_RECIPES,
  loadRecipes
} from "../actions";

describe("fetchRecipes", () => {
  it(`should query the API`, () => {
    const generator = fetchRecipes();
    expect(generator.next().value).toEqual(call(performQuery, GET_RECIPES));
  });

  describe("when the API call succeeds", () => {
    it("should dispatch a recipesLoaded action with the version", () => {
      const generator = fetchRecipes();
      const recipes = [{ id: "fake", title: "Burnt toast" }];
      generator.next();
      expect(generator.next({ recipes }).value).toEqual(
        put(recipesLoaded(recipes))
      );
    });
  });

  describe("when the API call fails", () => {
    it("should dispatch a errorLoadingRecipes action with the error", () => {
      const generator = fetchRecipes();
      const error = new Error();
      generator.next();
      expect(generator.throw(error).value).toEqual(
        put(errorLoadingRecipes(error))
      );
    });
  });
});

describe("watchLoadRecipes", () => {
  it(`should delegate ${LOAD_RECIPES} actions to fetchRecipes`, () => {
    const generator = watchLoadRecipes();
    expect(generator.next(loadRecipes()).value).toEqual(
      takeLatest(LOAD_RECIPES, fetchRecipes)
    );
  });
});
