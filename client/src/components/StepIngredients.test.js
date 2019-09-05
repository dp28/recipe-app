import React from "react";
import ReactDOM from "react-dom";
import { UnconnectedStepIngredients, mapStateToProps } from "./StepIngredients";

describe("StepIngredients", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <UnconnectedStepIngredients step={{}} ingredients={[]} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("mapStateToProps", () => {
  it("returns all the ingredients for the step's ingredeintIds", () => {
    const ingredients = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
    const state = { recipe: { ingredients } };
    const step = { ingredientIds: ["1", "2"] };
    expect(mapStateToProps(state, { step }).ingredients).toEqual(
      ingredients.slice(0, 2)
    );
  });
});
