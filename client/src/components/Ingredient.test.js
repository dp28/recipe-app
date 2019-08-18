import React from "react";
import ReactDOM from "react-dom";
import {
  UnconnectedIngredient as Ingredient,
  mapStateToProps
} from "./Ingredient";

describe("Ingredient", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Ingredient
        ingredient={{
          id: "fake_id",
          food: { name: "onion" },
          measurement: { amount: 1, size: "large" }
        }}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("mapStateToProps", () => {
  describe("when the recipe has no scaledServings", () => {
    it("should return the ingredient given in ownProps", () => {
      const ingredient = {
        id: "fake_id",
        food: { name: "onion" },
        measurement: { amount: 1, size: "large" }
      };
      const recipe = {
        ingredients: [ingredient]
      };
      expect(mapStateToProps({ recipe }, { ingredient }).ingredient).toEqual(
        ingredient
      );
    });
  });

  describe("when the recipe has scaledServings", () => {
    describe("but the ingredient has no amount", () => {
      it("should return the ingredient given in ownProps", () => {
        const ingredient = {
          id: "fake_id",
          food: { name: "sea salt" },
          measurement: null
        };
        const recipe = {
          servings: 2,
          scaledServings: 4,
          ingredients: [ingredient]
        };
        expect(mapStateToProps({ recipe }, { ingredient }).ingredient).toEqual(
          ingredient
        );
      });
    });
    describe("and the ingredient has an amount", () => {
      it("should return the ingredient with the amount scaled by the factor difference between servings and scaledServings", () => {
        const ingredient = {
          id: "fake_id",
          food: { name: "onion" },
          measurement: { amount: 1, size: "large" }
        };
        const recipe = {
          servings: 2,
          scaledServings: 4,
          ingredients: [ingredient]
        };
        expect(mapStateToProps({ recipe }, { ingredient }).ingredient).toEqual({
          id: "fake_id",
          food: { name: "onion" },
          measurement: { amount: 2, size: "large" }
        });
      });
    });
  });
});
