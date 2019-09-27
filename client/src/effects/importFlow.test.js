import { put, call, takeLatest } from "redux-saga/effects";

import { watchImportActions, startNextImportStep } from "./importFlow";
import {
  SET_RECIPE_TITLE,
  SET_RECIPE_SERVINGS,
  SET_RECIPE_INGREDIENTS,
  setRecipeTitle,
  setRecipeServings,
  setRecipeIngredients,
  requestTitle,
  requestServings,
  requestIngredients,
  requestMethod
} from "../extensionInterface/actions";
import { RECIPE_LOADED, recipeLoaded } from "../actions";

describe("startNextImportStep", () => {
  describe(`when ${RECIPE_LOADED} is recieved`, () => {
    describe("without a recipe", () => {
      it("should dispatch a requestTitle action", () => {
        const generator = startNextImportStep(recipeLoaded(null));
        generator.next();
        expect(generator.next({}).value).toEqual(put(requestTitle()));
      });
    });

    describe("with a recipe", () => {
      it("should not dispatch any action", () => {
        const generator = startNextImportStep(recipeLoaded({ id: "fake" }));
        generator.next();
        expect(generator.next({}).done).toEqual(true);
      });
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
          RECIPE_LOADED,
          SET_RECIPE_TITLE,
          SET_RECIPE_SERVINGS,
          SET_RECIPE_INGREDIENTS
        ],
        startNextImportStep
      )
    );
  });
});
