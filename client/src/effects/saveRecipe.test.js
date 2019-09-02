import { call, put, takeLatest } from "redux-saga/effects";
import {
  performSaveRecipeMutation,
  SAVE_RECIPE_MUTATION,
  watchSaveRecipe
} from "./saveRecipe";
import { performQuery } from "./performQuery";
import {
  errorSavingRecipe,
  recipeSaved,
  SAVE_RECIPE,
  saveRecipe
} from "../actions";

describe("performSaveRecipeMutation", () => {
  it(`should send a nutation to the API`, () => {
    const generator = performSaveRecipeMutation({ recipe: { id: "fake" } });
    expect(generator.next().value).toEqual(
      call(performQuery, SAVE_RECIPE_MUTATION, { recipe: { id: "fake" } })
    );
  });

  describe("when the API call succeeds", () => {
    it("should dispatch a recipeSaved action with the  recipe id", () => {
      const generator = performSaveRecipeMutation({ recipe: { id: "fake" } });
      const recipe = { id: "fake", title: "Burnt toast" };
      generator.next();
      expect(
        generator.next({ saveRecipe: { event: { payload: { recipe } } } }).value
      ).toEqual(put(recipeSaved(recipe.id)));
    });
  });

  describe("when the API call fails", () => {
    it("should dispatch a errorSavingRecipe action with the error", () => {
      const generator = performSaveRecipeMutation({ recipe: { id: "fake" } });
      const error = new Error();
      generator.next();
      expect(generator.throw(error).value).toEqual(
        put(errorSavingRecipe(error))
      );
    });
  });
});

describe("watchSaveRecipe", () => {
  it(`should delegate ${SAVE_RECIPE} actions to performSaveRecipeMutation`, () => {
    const generator = watchSaveRecipe();
    expect(generator.next(saveRecipe({ url: "fake" })).value).toEqual(
      takeLatest(SAVE_RECIPE, performSaveRecipeMutation)
    );
  });
});
