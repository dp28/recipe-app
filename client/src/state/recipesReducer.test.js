import { recipesReducer as reducer } from "./recipesReducer";
import { recipesLoaded } from "../actions";

describe("reducer", () => {
  const initialState = reducer(undefined, { type: "INIT" });

  describe("with an init action", () => {
    it("should return an empty array", () => {
      expect(initialState).toEqual([]);
    });
  });

  describe("with an unknown action", () => {
    it("should return the passed-in state", () => {
      expect(reducer(initialState, { type: "FAKE_ACTION" })).toBe(initialState);
    });
  });

  describe("with a recipesLoaded action", () => {
    it("should replace the current recipes", () => {
      const expectedRecipes = [{ id: "fake" }];
      const recipes = reducer(initialState, recipesLoaded(expectedRecipes));
      expect(recipes).toEqual(expectedRecipes);
    });
  });
});
