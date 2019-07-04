import React from "react";
import ReactDOM from "react-dom";
import {
  UnconnectedIngredientList as IngredientList,
  mapStateToProps
} from "./IngredientList";

const ingredients = [
  {
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
  }
];

describe("IngredientList", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<IngredientList ingredients={ingredients} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("mapStateToProps", () => {
  it("extracts the ingredients from the state", () => {
    const state = { ingredients };
    expect(mapStateToProps(state).ingredients).toEqual(ingredients);
  });
});
