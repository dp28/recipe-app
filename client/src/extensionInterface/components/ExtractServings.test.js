import React from "react";
import { UnconnectedExtractServings, mapStateToProps } from "./ExtractServings";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<UnconnectedExtractServings scaledServings={3} />);
  renderer.getRenderOutput();
});

describe("mapStateToProps", () => {
  it("extracts the current recipe scaledServings from the state", () => {
    const recipe = { scaledServings: 4 };
    expect(
      mapStateToProps({ recipe, browserExtension: {} }).scaledServings
    ).toEqual(recipe.scaledServings);
  });

  describe("if scaledServings is not set", () => {
    it("returns undefined", () => {
      const recipe = { servings: 4 };
      expect(mapStateToProps({ recipe }).scaledServings).toEqual(undefined);
    });
  });
});
