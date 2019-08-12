import React from "react";
import {
  UnconnectedExtractIngredients,
  mapStateToProps,
  mapDispatchToProps
} from "./ExtractIngredients";
import * as actions from "../actions";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<UnconnectedExtractIngredients recipe={{}} />);
  renderer.getRenderOutput();
});

describe("mapStateToProps", () => {
  it("extracts the current recipe ingredients from the state", () => {
    const recipe = { ingredients: [{ text: "fake" }] };
    expect(
      mapStateToProps({ recipe, browserExtension: {} }).ingredients
    ).toEqual(recipe.ingredients);
  });

  it("returns waitingForIngredients as true if the state is waiting for the ingredients", () => {
    expect(
      mapStateToProps({
        recipe: {},
        browserExtension: { waitingFor: "ingredients" }
      }).waitingForIngredients
    ).toEqual(true);
  });

  it("returns waitingForIngredients as false if the state is not waiting for the ingredients", () => {
    expect(
      mapStateToProps({ recipe: {}, browserExtension: { waitingFor: null } })
        .waitingForIngredients
    ).toEqual(false);
  });
});

describe("mapDispatchToProps", () => {
  it("should return a requestIngredients action handler", () => {
    const dispatch = jest.fn();
    const { requestIngredients } = mapDispatchToProps(dispatch);
    requestIngredients();
    expect(dispatch).toHaveBeenCalledWith(actions.requestIngredients());
  });
});
