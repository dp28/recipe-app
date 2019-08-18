import { recipeReducer as reducer } from "./recipeReducer";
import {
  setRecipeUrl,
  setRecipeTitle,
  setRecipeServings,
  setRecipeIngredients,
  setRecipeMethod
} from "../extensionInterface/actions";
import { scaleByServings } from "../actions";

describe("reducer", () => {
  const initialState = reducer(undefined, { type: "INIT" });

  describe("with an init action", () => {
    it("should return an empty object", () => {
      expect(initialState).toEqual({});
    });
  });

  describe("with an unknown action", () => {
    it("should return the passed-in state", () => {
      expect(reducer(initialState, { type: "FAKE_ACTION" })).toBe(initialState);
    });
  });

  describe("with a setRecipeUrl action", () => {
    it("should set the url of the current recipe", () => {
      const url = "https://example.com";
      const recipe = reducer(initialState, setRecipeUrl(url));
      expect(recipe.url).toEqual(url);
    });
  });

  describe("with a setRecipeTitle action", () => {
    it("should set the title of the current recipe", () => {
      const title = "my great recipe";
      const recipe = reducer(initialState, setRecipeTitle(title));
      expect(recipe.title).toEqual(title);
    });
  });

  describe("with a setRecipeServings action", () => {
    it("should set the servings of the current recipe to a number", () => {
      const recipe = reducer(initialState, setRecipeServings("4"));
      expect(recipe.servings).toEqual(4);
    });

    describe("if there is text and numbers in the serving", () => {
      it("should just use the numbers", () => {
        const recipe = reducer(initialState, setRecipeServings("Serves 40"));
        expect(recipe.servings).toEqual(40);
      });
    });

    describe("if there are no numbers in the serving", () => {
      it("should return undefined", () => {
        const recipe = reducer(initialState, setRecipeServings("something"));
        expect(recipe.servings).toEqual(undefined);
      });
    });
  });

  describe("with a setRecipeIngredients action", () => {
    const ingredient = {
      id: "fake_id",
      food: {
        name: "onion"
      },
      measurement: {
        amount: 1,
        size: "large"
      }
    };
    const recipe = reducer(initialState, setRecipeIngredients([ingredient]));

    it("should add an ingredient for each passed-in ingredient", () => {
      expect(recipe.ingredients).toEqual([ingredient]);
    });
  });

  describe("with a setRecipeMethod action", () => {
    it("should add an instruction for each passed-in instruction", () => {
      const recipe = reducer(initialState, setRecipeMethod(["something"]));
      expect(recipe.method.instructions.length).toEqual(1);
    });

    describe("each instruction", () => {
      const input = "something";
      const recipe = reducer(initialState, setRecipeMethod([input]));
      const instruction = recipe.method.instructions[0];

      it("should have the input as its text", () => {
        expect(instruction.text).toEqual(input);
      });
    });
  });

  describe("with a scaleByServings action", () => {
    it("should add a scaledServings field with the 'servings' value", () => {
      const recipe = reducer(initialState, scaleByServings(10));
      expect(recipe.scaledServings).toEqual(10);
    });
  });
});
