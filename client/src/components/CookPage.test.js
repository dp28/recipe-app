import React from "react";
import { UnconnectedCookPage, mapStateToProps } from "./CookPage";
import ShallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <UnconnectedCookPage
      recipe={{ title: "fake", ingredients: [], method: { steps: [] } }}
    />
  );
  renderer.getRenderOutput();
});

describe("mapStateToProps", () => {
  it("should extract the recipe from the state", () => {
    const state = { recipe: { id: "fake" } };
    expect(mapStateToProps(state).recipe).toEqual(state.recipe);
  });
});
