import React from "react";
import ReactDOM from "react-dom";
import {
  UnconnectedShoppingList as ShoppingList,
  mapStateToProps
} from "./ShoppingList";

const ingredient = {
  rawText: "10g sugar",
  food: {
    name: "sugar"
  },
  measurement: {
    amount: 10,
    unit: {
      symbol: "g"
    }
  }
};

const ingredients = new Map();
ingredients.set(ingredient.food.name, ingredient);

describe("ShoppingList", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ShoppingList ingredients={ingredients} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("mapStateToProps", () => {
  it("extracts the ingredients from the state", () => {
    const state = { ingredients: [ingredient] };
    expect(mapStateToProps(state).ingredients).toEqual(ingredients);
  });

  describe("if there are multiple ingredients with the same food", () => {
    const food = { name: "sugar" };

    describe("and there are no measurements", () => {
      it("should only return one copy", () => {
        const state = {
          ingredients: [{ food }, { food }]
        };
        expect([...mapStateToProps(state).ingredients.values()]).toEqual([
          { food }
        ]);
      });
    });

    describe("and there are measurements with different units", () => {
      it.skip("should return both ingredients", () => {
        // This is broken because the data model is currently very rough and
        // can't handle this case

        const state = {
          ingredients: [
            { food, measurement: { unit: { symbol: "g" } } },
            { food, measurement: { unit: { symbol: "oz" } } }
          ]
        };
        expect([...mapStateToProps(state).ingredients.values()]).toEqual(
          state.ingredients
        );
      });
    });

    describe("and there are measurements with the same units", () => {
      it("should the ingredients added together into a single unit", () => {
        const state = {
          ingredients: [
            { food, measurement: { amount: 10, unit: { symbol: "g" } } },
            { food, measurement: { amount: 20, unit: { symbol: "g" } } }
          ]
        };
        expect([...mapStateToProps(state).ingredients.values()]).toEqual([
          {
            food,
            measurement: { amount: 30, unit: { symbol: "g" } }
          }
        ]);
      });
    });
  });
});
