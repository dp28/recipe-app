import { browserExtensionReducer as reducer } from "./reducer";
import {
  requestTitle,
  requestServings,
  requestIngredients,
  requestMethod,
  setRecipeTitle,
  setRecipeServings,
  setRecipeIngredients,
  setRecipeMethod,
  finishCurrentExtractStep
} from "./actions";
import { recipeLoaded } from "../actions";

function toInput(browserExtension, recipe) {
  return { browserExtension, recipe };
}

describe("browserExtension reducer", () => {
  const initialState = reducer(undefined, { type: "INIT" });

  function reduceFromInitialState(actions, recipe = {}) {
    return actions.reduce(
      (state, action) => reducer(toInput(state, recipe), action),
      initialState
    );
  }

  describe("with an init action", () => {
    it("should not be waiting", () => {
      expect(initialState.waiting).toEqual(false);
    });

    it("should not have a current step", () => {
      expect(initialState.currentStep).toEqual(null);
    });

    it("should be loading", () => {
      expect(initialState.loading).toEqual(true);
    });
  });

  describe("with an unknown action", () => {
    it("should return the passed-in state", () => {
      expect(reducer(toInput(initialState), { type: "FAKE_ACTION" })).toBe(
        initialState
      );
    });
  });

  describe("with a recipeLoaded action", () => {
    const state = reduceFromInitialState([recipeLoaded({})]);

    it("should set waiting to false", () => {
      expect(state.waiting).toEqual(false);
    });

    it("should not be loading", () => {
      expect(state.loading).toEqual(false);
    });

    describe("if no recipe was loaded", () => {
      it("should be in the 'title' step", () => {
        const noRecipeState = reduceFromInitialState([recipeLoaded(null)]);
        expect(noRecipeState.currentStep).toEqual("title");
      });
    });

    describe("if a recipe was loaded", () => {
      it("should not have a current step", () => {
        expect(state.currentStep).toEqual(null);
      });
    });
  });

  describe("with a requestTitle action", () => {
    const state = reduceFromInitialState([recipeLoaded(null), requestTitle()]);

    it("should set waiting to true", () => {
      expect(state.waiting).toEqual(true);
    });
  });

  describe("with a setRecipeTitle action", () => {
    it("should set waiting to false", () => {
      const state = reduceFromInitialState([
        recipeLoaded(null),
        requestTitle(),
        setRecipeTitle("title")
      ]);

      expect(state.waiting).toEqual(false);
    });
  });

  describe("with a requestServings action", () => {
    it("should set waiting to true", () => {
      const state = reduceFromInitialState([requestServings()]);
      expect(state.waiting).toEqual(true);
    });
  });

  describe("with a setRecipeServings action", () => {
    it("should set waiting to false", () => {
      const state = reduceFromInitialState([
        requestServings(),
        setRecipeServings("4")
      ]);

      expect(state.waiting).toEqual(false);
    });
  });

  describe("with a requestIngredients action", () => {
    it("should set waiting to true", () => {
      const state = reduceFromInitialState([requestIngredients()]);
      expect(state.waiting).toEqual(true);
    });
  });

  describe("with a setRecipeIngredients action", () => {
    it("should set waiting to false", () => {
      const state = reduceFromInitialState([
        requestIngredients(),
        setRecipeIngredients(["something"])
      ]);

      expect(state.waiting).toEqual(false);
    });
  });

  describe("with a requestMethod action", () => {
    it("should set waiting to true", () => {
      const state = reduceFromInitialState([requestMethod()]);
      expect(state.waiting).toEqual(true);
    });
  });

  describe("with a setRecipeMethod action", () => {
    it("should set waiting to false", () => {
      const state = reduceFromInitialState([
        requestMethod(),
        setRecipeMethod(["something"])
      ]);

      expect(state.waiting).toEqual(false);
    });
  });

  describe("with a finishCurrentExtractStep action", () => {
    describe("when in the 'title' step", () => {
      const state = reduceFromInitialState(
        [recipeLoaded(), finishCurrentExtractStep()],
        { title: "fake" }
      );

      it("should progress to the 'servings' step", () => {
        expect(state.currentStep).toEqual("servings");
      });

      describe("if the recipe title has not been set", () => {
        it("should not progress", () => {
          const badState = reduceFromInitialState(
            [recipeLoaded(), finishCurrentExtractStep()],
            {}
          );
          expect(badState.currentStep).toEqual("title");
        });
      });
    });

    describe("when in the 'servings' step", () => {
      const state = reduceFromInitialState(
        [
          recipeLoaded(),
          finishCurrentExtractStep(),
          finishCurrentExtractStep()
        ],
        { title: "fake", servings: 4 }
      );

      it("should progress to the 'ingredients' step", () => {
        expect(state.currentStep).toEqual("ingredients");
      });

      describe("if the recipe servings have not been set", () => {
        it("should not progress", () => {
          const badState = reduceFromInitialState(
            [
              recipeLoaded(),
              finishCurrentExtractStep(),
              finishCurrentExtractStep()
            ],
            { title: "fake" }
          );
          expect(badState.currentStep).toEqual("servings");
        });
      });
    });

    describe("when in the 'ingredients' step", () => {
      const state = reduceFromInitialState(
        [
          recipeLoaded(),
          finishCurrentExtractStep(),
          finishCurrentExtractStep(),
          finishCurrentExtractStep()
        ],
        { title: "fake", servings: 4, ingredients: [{ id: "1" }] }
      );

      it("should progress to the 'method' step", () => {
        expect(state.currentStep).toEqual("method");
      });

      describe("if the recipe ingredients have not been set", () => {
        it("should not progress", () => {
          const badState = reduceFromInitialState(
            [
              recipeLoaded(),
              finishCurrentExtractStep(),
              finishCurrentExtractStep(),
              finishCurrentExtractStep()
            ],
            { title: "fake", servings: 4 }
          );
          expect(badState.currentStep).toEqual("ingredients");
        });
      });
    });

    describe("when in the 'method' step", () => {
      const state = reduceFromInitialState(
        [
          recipeLoaded(),
          finishCurrentExtractStep(),
          finishCurrentExtractStep(),
          finishCurrentExtractStep(),
          finishCurrentExtractStep()
        ],
        {
          title: "fake",
          servings: 4,
          ingredients: [{ id: "1" }],
          method: { steps: [{ id: "1" }] }
        }
      );

      it("should progress to a null step", () => {
        expect(state.currentStep).toEqual(null);
      });

      describe("if the recipe method has not been set", () => {
        it("should not progress", () => {
          const badState = reduceFromInitialState(
            [
              recipeLoaded(),
              finishCurrentExtractStep(),
              finishCurrentExtractStep(),
              finishCurrentExtractStep(),
              finishCurrentExtractStep()
            ],
            { title: "fake", servings: 4, ingredients: [{ id: "1" }] }
          );
          expect(badState.currentStep).toEqual("method");
        });
      });
    });
  });
});
