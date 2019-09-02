import { reducer } from "./reducer";
import {
  updateIngredients,
  combineIngredients,
  addCategory,
  addToCategory
} from "../actions";
import { parseIngredient } from "../domain/parseIngredient";

describe("reducer", () => {
  const initialState = reducer(undefined, { type: "INIT" });

  describe("with an init action", () => {
    it("should return an empty object", () => {
      expect(initialState).toEqual({
        meta: { api: { loading: true }, recipes: { loading: false } },
        ingredients: [],
        categories: [],
        recipe: {},
        recipes: [],
        browserExtension: { waitingFor: null }
      });
    });
  });

  describe("with an unknown action", () => {
    it("should return the passed-in state", () => {
      expect(reducer(initialState, { type: "FAKE_ACTION" })).toBe(initialState);
    });
  });

  describe("with an updateIngredients action", () => {
    it("should pass each line to parseIngredient", () => {
      const ingredients = `
        10g sugar
        1 egg
      `;
      const state = reducer(initialState, updateIngredients({ ingredients }));
      expect(state.ingredients).toEqual(
        ingredients.split("\n").map(parseIngredient)
      );
    });
  });

  describe("with a combineIngredients action", () => {
    it("should replace the two ingredients with their combined result, ignoring the food", () => {
      const ingredients = [
        {
          food: { name: "sugar" },
          measurement: { amount: 10, unit: { symbol: "g" } }
        },
        {
          food: { name: "brown sugar" },
          measurement: { amount: 20, unit: { symbol: "g" } }
        }
      ];
      const hasIngredients = { ...initialState, ingredients };
      const state = reducer(hasIngredients, combineIngredients(ingredients));
      expect(state.ingredients).toEqual([
        {
          food: { name: "sugar" },
          measurement: { amount: 30, unit: { symbol: "g" } }
        }
      ]);
    });
  });

  describe("with an addCategory action", () => {
    it("should add a new category", () => {
      const name = "Dairy";
      const state = reducer(initialState, addCategory({ name }));
      expect(state.categories).toEqual([{ name }]);
    });
  });

  describe("with an addToCategory action", () => {
    it("should add the categoryName to the ingredient", () => {
      const name = "Dairy";
      const ingredient = {
        food: { name: "sugar" },
        measurement: { amount: 30, unit: { symbol: "g" } }
      };
      const startState = {
        ...initialState,
        categories: [{ name }],
        ingredients: [ingredient]
      };
      const state = reducer(
        startState,
        addToCategory({ ingredient, categoryName: name })
      );
      expect(state.ingredients).toEqual([
        { ...ingredient, categoryName: name }
      ]);
    });
  });
});
