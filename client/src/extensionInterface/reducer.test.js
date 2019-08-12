import { browserExtensionReducer as reducer } from "./reducer";
import {
  requestTitle,
  requestServings,
  requestIngredients,
  requestMethod,
  setRecipeTitle,
  setRecipeServings,
  setRecipeIngredients,
  setRecipeMethod
} from "../extensionInterface/actions";

describe("browserExtension reducer", () => {
  const initialState = reducer(undefined, { type: "INIT" });

  describe("with an init action", () => {
    it("should return an empty object", () => {
      expect(initialState).toEqual({ waitingFor: null });
    });
  });

  describe("with an unknown action", () => {
    it("should return the passed-in state", () => {
      expect(reducer(initialState, { type: "FAKE_ACTION" })).toBe(initialState);
    });
  });

  describe("with a requestTitle action", () => {
    it("should set waitingFor to 'title'", () => {
      const state = reducer(initialState, requestTitle());
      expect(state.waitingFor).toEqual("title");
    });
  });

  describe("with a setRecipeTitle action", () => {
    it("should set waitingFor to null", () => {
      const state = reducer(
        reducer(initialState, requestTitle()),
        setRecipeTitle("title")
      );
      expect(state.waitingFor).toEqual(null);
    });
  });

  describe("with a requestServings action", () => {
    it("should set waitingFor to 'servings'", () => {
      const state = reducer(initialState, requestServings());
      expect(state.waitingFor).toEqual("servings");
    });
  });

  describe("with a setRecipeServings action", () => {
    it("should set waitingFor to null", () => {
      const state = reducer(
        reducer(initialState, requestTitle()),
        setRecipeServings("4")
      );
      expect(state.waitingFor).toEqual(null);
    });
  });

  describe("with a requestIngredients action", () => {
    it("should set waitingFor to 'ingredients'", () => {
      const state = reducer(initialState, requestIngredients());
      expect(state.waitingFor).toEqual("ingredients");
    });
  });

  describe("with a setRecipeIngredients action", () => {
    it("should set waitingFor to null", () => {
      const state = reducer(
        reducer(initialState, requestIngredients()),
        setRecipeIngredients(["something"])
      );
      expect(state.waitingFor).toEqual(null);
    });
  });

  describe("with a requestMethod action", () => {
    it("should set waitingFor to 'method'", () => {
      const state = reducer(initialState, requestMethod());
      expect(state.waitingFor).toEqual("method");
    });
  });

  describe("with a setRecipeMethod action", () => {
    it("should set waitingFor to null", () => {
      const state = reducer(
        reducer(initialState, requestMethod()),
        setRecipeMethod(["something"])
      );
      expect(state.waitingFor).toEqual(null);
    });
  });
});
