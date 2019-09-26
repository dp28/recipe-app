import { put, call, takeLatest } from "redux-saga/effects";

import { watchImportActions, startNextImportStep } from "./importFlow";
import {
  SET_RECIPE_URL,
  SET_RECIPE_TITLE,
  SET_RECIPE_SERVINGS,
  SET_RECIPE_INGREDIENTS,
  setRecipeUrl,
  setRecipeTitle,
  setRecipeServings,
  setRecipeIngredients,
  requestTitle,
  requestServings,
  requestIngredients,
  requestMethod
} from "../extensionInterface/actions";

describe("startNextImportStep", () => {
  describe(`when ${SET_RECIPE_URL} is recieved`, () => {
    it("should dispatch a requestTitle action", () => {
      const generator = startNextImportStep(setRecipeUrl("example.com"));
      generator.next();
      expect(generator.next({}).value).toEqual(put(requestTitle()));
    });
  });

  describe(`when ${SET_RECIPE_TITLE} is recieved`, () => {
    it("should dispatch a requestServings action", () => {
      const generator = startNextImportStep(setRecipeTitle("great recipe"));
      generator.next();
      expect(generator.next({}).value).toEqual(put(requestServings()));
    });

    describe("if the servings have already been set", () => {
      it("should not dispatch an action", () => {
        const generator = startNextImportStep(setRecipeTitle("great recipe"));
        generator.next();
        expect(generator.next({ servings: 2 }).done).toEqual(true);
      });
    });
  });

  describe(`when ${SET_RECIPE_SERVINGS} is recieved`, () => {
    it("should dispatch a requestIngredients action", () => {
      const generator = startNextImportStep(setRecipeServings(2));
      generator.next();
      expect(generator.next({}).value).toEqual(put(requestIngredients()));
    });

    describe("if the ingredients have already been set", () => {
      it("should not dispatch an action", () => {
        const generator = startNextImportStep(setRecipeServings(2));
        generator.next();
        expect(generator.next({ ingredients: [{}] }).done).toEqual(true);
      });
    });
  });

  describe(`when ${SET_RECIPE_INGREDIENTS} is recieved`, () => {
    it("should dispatch a requestMethod action", () => {
      const generator = startNextImportStep(setRecipeIngredients([]));
      generator.next();
      expect(generator.next({}).value).toEqual(put(requestMethod()));
    });

    describe("if the method has already been set", () => {
      it("should not dispatch an action", () => {
        const generator = startNextImportStep(setRecipeIngredients([]));
        generator.next();
        expect(generator.next({ method: { steps: [{}] } }).done).toEqual(true);
      });
    });
  });
});

describe("watchImportActions", () => {
  it(`should delegate all recipe setter actions to startNextImportStep`, () => {
    const generator = watchImportActions();
    expect(generator.next().value).toEqual(
      takeLatest(
        [
          SET_RECIPE_URL,
          SET_RECIPE_TITLE,
          SET_RECIPE_SERVINGS,
          SET_RECIPE_INGREDIENTS
        ],
        startNextImportStep
      )
    );
  });
});
