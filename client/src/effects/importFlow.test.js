import { put, takeLatest } from "redux-saga/effects";

import { watchImportActions, startNextImportStep } from "./importFlow";
import { requestTitle } from "../extensionInterface/actions";
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
});

describe("watchImportActions", () => {
  it(`should delegate all recipe setter actions to startNextImportStep`, () => {
    const generator = watchImportActions();
    expect(generator.next().value).toEqual(
      takeLatest([RECIPE_LOADED], startNextImportStep)
    );
  });
});
