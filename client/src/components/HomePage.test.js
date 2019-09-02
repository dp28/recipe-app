import React from "react";
import { UnconnectedHomePage, mapStateToProps } from "./HomePage";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(<UnconnectedHomePage recipes={[]} />);
  renderer.getRenderOutput();
});

describe("mapStateToProps", () => {
  it("should extract the recipes from the state", () => {
    const state = { recipes: [{ id: "fake" }] };
    expect(mapStateToProps(state).recipes).toEqual(state.recipes);
  });
});
