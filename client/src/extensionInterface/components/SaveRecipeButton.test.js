import React from "react";
import {
  UnconnectedSaveRecipeButton,
  mapStateToProps,
  mapDispatchToProps
} from "./SaveRecipeButton";
import * as actions from "../../actions";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<UnconnectedSaveRecipeButton recipe={null} />);
  renderer.getRenderOutput();
});

describe("mapStateToProps", () => {
  describe("if the current recipe has a title, servings, ingredients, and steps", () => {
    it("extracts the current recipe title from the state", () => {
      const recipe = {
        title: "fake",
        servings: 2,
        ingredients: [{ id: "fake" }],
        method: { steps: [{ id: "fake" }] }
      };
      expect(mapStateToProps({ recipe }).recipe).toEqual(recipe);
    });
  });
  describe("if the title is missing", () => {
    it("returns the recipe as null", () => {
      const recipe = {
        servings: 2,
        ingredients: [{ id: "fake" }],
        method: { steps: [{ id: "fake" }] }
      };
      expect(mapStateToProps({ recipe }).recipe).toEqual(null);
    });
  });
  describe("if the servings are missing", () => {
    it("returns the recipe as null", () => {
      const recipe = {
        title: "fake",
        ingredients: [{ id: "fake" }],
        method: { steps: [{ id: "fake" }] }
      };
      expect(mapStateToProps({ recipe }).recipe).toEqual(null);
    });
  });
  describe("if the ingredients are missing", () => {
    it("returns the recipe as null", () => {
      const recipe = {
        title: "fake",
        servings: 2,
        method: { steps: [{ id: "fake" }] }
      };
      expect(mapStateToProps({ recipe }).recipe).toEqual(null);
    });
  });
  describe("if the steps are missing", () => {
    it("returns the recipe as null", () => {
      const recipe = {
        title: "fake",
        servings: 2,
        ingredients: [{ id: "fake" }]
      };
      expect(mapStateToProps({ recipe }).recipe).toEqual(null);
    });
  });
});

describe("mapDispatchToProps", () => {
  it("should return a saveRecipe action handler", () => {
    const dispatch = jest.fn();
    const { saveRecipe } = mapDispatchToProps(dispatch);
    saveRecipe({});
    expect(dispatch).toHaveBeenCalledWith(actions.saveRecipe({}));
  });
});
