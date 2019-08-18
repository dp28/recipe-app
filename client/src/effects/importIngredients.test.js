import { put, call, takeLatest } from "redux-saga/effects";

import {
  watchImportIngredients,
  importIngredientsSaga
} from "./importIngredients";
import {
  IMPORT_RECIPE_INGREDIENTS,
  importRecipeIngredients,
  setRecipeIngredients
} from "../extensionInterface/actions";
import { parseIngredients } from "../language/ingredients";

describe("importIngredientsSaga", () => {
  it(`should parse the ingredients`, () => {
    const generator = importIngredientsSaga(
      importRecipeIngredients(["1 onion"])
    );
    expect(generator.next().value).toEqual(call(parseIngredients, ["1 onion"]));
  });

  describe("when the parsing succeeds", () => {
    it("should dispatch a setRecipeIngredients action with the parsed ingredients", () => {
      const generator = importIngredientsSaga(
        importRecipeIngredients(["1 onion"])
      );
      generator.next();
      const parsed = parseIngredients(["1 onion"]);
      expect(generator.next(parsed).value).toEqual(
        put(setRecipeIngredients(parsed))
      );
    });
  });
});

describe("watchImportIngredients", () => {
  it(`should delegate ${IMPORT_RECIPE_INGREDIENTS} actions to importIngredientsSaga`, () => {
    const generator = watchImportIngredients();
    expect(generator.next(importRecipeIngredients(["1 onion"])).value).toEqual(
      takeLatest(IMPORT_RECIPE_INGREDIENTS, importIngredientsSaga)
    );
  });
});
