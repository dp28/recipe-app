import { put, call, takeLatest, select } from "redux-saga/effects";

import {
  watchImportMethod,
  importMethodSaga,
  selectIngredients
} from "./importMethod";
import {
  IMPORT_RECIPE_METHOD,
  importRecipeMethod,
  setRecipeMethod
} from "../extensionInterface/actions";
import { parseMethod } from "../language/method";

describe("importMethodSaga", () => {
  it("should get the ingredients from the state", () => {
    const generator = importMethodSaga(importRecipeMethod(["Chop onion"]));
    expect(generator.next().value).toEqual(select(selectIngredients));
  });

  it(`should parse the method`, () => {
    const generator = importMethodSaga(importRecipeMethod(["Chop onion"]));
    generator.next();
    const ingredients = [];
    expect(generator.next(ingredients).value).toEqual(
      call(parseMethod, { ingredients, steps: ["Chop onion"] })
    );
  });

  describe("when the parsing succeeds", () => {
    it("should dispatch a setRecipeMethod action with the parsed method", () => {
      const generator = importMethodSaga(importRecipeMethod(["Chop onion"]));
      generator.next();
      generator.next([]);
      const parsed = parseMethod({ ingredients: [], steps: ["Chop onion"] });
      expect(generator.next(parsed).value).toEqual(
        put(setRecipeMethod(parsed))
      );
    });
  });
});

describe("watchImportMethod", () => {
  it(`should delegate ${IMPORT_RECIPE_METHOD} actions to importMethodSaga`, () => {
    const generator = watchImportMethod();
    expect(generator.next(importRecipeMethod(["Chop onion"])).value).toEqual(
      takeLatest(IMPORT_RECIPE_METHOD, importMethodSaga)
    );
  });
});
